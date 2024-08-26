import React from "react";

import type { Story } from "@ladle/react";

import MyApp from "../../src/App";

export const App: Story = () => (
  <>
    <MyApp />
    <p>Structures in App component do not work due to vite not hosting /src</p>
  </>
);
