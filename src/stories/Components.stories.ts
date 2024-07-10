import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import SelectDropdown, {
  SelectDropdownProps,
} from "../components/SelectDropdown/SelectDropdown";

const meta = {
  title: "Components",
  component: SelectDropdown,
  argTypes: {
    withSearch: { control: "boolean" },
    multiple: { control: "boolean" },
  },
} satisfies Meta<typeof SelectDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SelectDropdownField: Story = {
  args: {
    id: "default-dropdown",
    withSearch: true,
    options: [
      { label: "Option 1", value: "option1" },
      { label: "Option with icon", value: "option2" },
      { label: "Long Long Option 3", value: "option3" },
      { label: "Long Long Long Option 4", value: "option4" },
      { label: "Long Long Long Long Option 5", value: "option5" },
      { label: "Long Long Long Long Long Option 6", value: "option6" },
    ],
    multiple: true,
  },
};
