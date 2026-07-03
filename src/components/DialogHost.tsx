import { useDialog } from "@/lib/dialog-context";
import FormDialog from "@/dialogs/FormDialog";
import { dialogRoutes } from "@/lib/dialog-routes";
import DeleteDialog from "@/dialogs/DeleteDialog";
import ReviewDialog from "@/dialogs/ReviewDialog";
import ImagePreviewDialog from "@/dialogs/ImagePreviewDialog";
import SiteUploadDialog from "@/dialogs/SiteUploadDialog";

export default function DialogHost() {
  const { state, closeDialog } = useDialog();
  const { name, params } = state;

  if (!name) return null;

  const route = dialogRoutes[name];
  if (!route) return null;

  const props = route.getProps?.(params) ?? {};

  const handleClose = () => {
    route.onClose?.(closeDialog);
    closeDialog();
  };

  switch (route.component) {
    case "form":
      return <FormDialog open onClose={handleClose} {...props} />;
    case "delete":
      return <DeleteDialog open onClose={handleClose} {...props} />;
    case "review":
      return <ReviewDialog open onClose={handleClose} {...props} />;
    case "image-preview":
      return <ImagePreviewDialog open onClose={handleClose} {...props} />;
    case "site-upload":
      return <SiteUploadDialog open onClose={handleClose} />;
    default:
      return null;
  }
}
