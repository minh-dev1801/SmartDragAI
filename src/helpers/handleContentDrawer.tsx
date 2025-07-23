import FormUserTask from "../components/form/flow/FormUserTask";

export const handleContentDrawer = (name: string) => {
  const baseName = name.toLowerCase().trim();

  switch (baseName) {
    case "user task":
      return <FormUserTask />;

    default:
      return undefined;
  }
};
