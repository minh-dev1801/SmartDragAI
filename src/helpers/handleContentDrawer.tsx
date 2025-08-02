import FormGetRecord from "../components/form/flow/form_record/FormGetRecord";
import FormOrganization from "../components/form/flow/FormOrganization";
import FormSendHTTPRequest from "../components/form/flow/FormSendHTTPRequest";
import FormSendMail from "../components/form/flow/FormSendMail";
import FormSendNotification from "../components/form/flow/FormSendNotification";
import FormUserTask from "../components/form/flow/FormUserTask";
import FormLoop from "../components/form/flow/FormLoop";
import FormRecord from "../components/form/flow/form_record/FormRecord";
import FormExclusiveGateway from "../components/form/flow/form_exclusive_gateway/FormExclusiveGateway";

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
      return <FormRecord />;

    case "get_record":
      return <FormGetRecord />;

    case "loop":
      return <FormLoop />;

    case "exclusive_gateway":
      return <FormExclusiveGateway />;

    case "inclusive_gateway":
      return <FormRecord />;

    case "parallel_gateway":
      return <FormRecord />;

    default:
      return undefined;
  }
};
