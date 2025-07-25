import FormSendHTTPRequest from "../components/form/flow/FormSendHTTPRequest";
import FormSendMail from "../components/form/flow/FormSendMail";
import FormUserTask from "../components/form/flow/FormUserTask";

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
      return <FormSendMail />;

    case "send_notification":
      return <FormSendMail />;

    case "create_or_update_record":
      return <FormSendMail />;

    case "get_record":
      return <FormSendMail />;

    case "loop":
      return <FormSendMail />;

    default:
      return undefined;
  }
};
