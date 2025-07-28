import FormCreateOrUpdateRecord from "../components/form/flow/form_record/FormMain";
import FormGetRecord from "../components/form/flow/form_record/FormGetRecord";
import FormOrganization from "../components/form/flow/FormOrganization";
import FormSendHTTPRequest from "../components/form/flow/FormSendHTTPRequest";
import FormSendMail from "../components/form/flow/FormSendMail";
import FormSendNotification from "../components/form/flow/FormSendNotification";
import FormUserTask from "../components/form/flow/FormUserTask";
import FormLoop from "../components/form/flow/FormLoop";

export const handleContentDrawer = (name: string) => {
  const baseName = name.toLowerCase().trim().replace(/\s/g, "_");

  switch (baseName) {
    case "user_task":
      return <FormUserTask />;

    case "send_email":
      return <FormSendMail />;

    case "send_http_request":
      return <FormSendHTTPRequest />;

    case "organization":
      return <FormOrganization />;

    case "send_notification":
      return <FormSendNotification />;

    case "create_or_update_record":
      return <FormCreateOrUpdateRecord />;

    case "get_record":
      return <FormGetRecord />;

    case "loop":
      return <FormLoop />;

    default:
      return undefined;
  }
};
