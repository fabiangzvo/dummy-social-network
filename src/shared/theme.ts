import { extendTheme, Theme } from "@chakra-ui/react";

const theme = {
  components: {
    Modal: {
      baseStyle: {
        dialog: {
          bg: "var(--background)",
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          backgroundColor: "var(--background)",
        },
      },
    },
    Tag: {
      baseStyle: {
        container: {
          bg: "var(--primary)",
        },
      },
    },
    Button: {
      variants: {
        outline: {
          borderColor: "var(--paragraph)",
        },
      },
    },
    Menu: {
      baseStyle: {
        list: {
          bg: "var(--background)",
        },
        item: {
          bg: "var(--background)",
        },
      },
    },
  },
  colors: {
    background: "var(--background)",
    text: "var(--text)",
    primary: "var(--primary)",
    secondary: "var(--secondary)",
    accent: "var(--accent)",
    paragraph: "var(--paragraph)",
    shadow: "var(--shadow)",
  },
  styles: {
    global: {
      body: {
        bg: "var(--background)",
        color: "var(--text)",
      },
    },
  },
};

export default extendTheme(theme);
