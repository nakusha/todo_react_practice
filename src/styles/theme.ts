type Theme = {
  background: string;
  firstColor: string;
  secondColor: string;
};

type CommonTheme = {
  fontSize: string;
};

const commonTheme: CommonTheme = {
  fontSize: "14px",
};

export const lightMode: Theme = {
  ...commonTheme,
  background: "#ffffff",
  firstColor: "",
  secondColor: "",
};

export const darkMode: Theme = {
  ...commonTheme,
  background: "#cccccc",
  firstColor: "",
  secondColor: "",
};
