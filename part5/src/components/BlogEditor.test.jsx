import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogEditor from "./BlogEditor";

test("callback is called correctly", async () => {
  const mockCallback = vi.fn();
  const user = userEvent.setup();
  render(<BlogEditor createBlogPost={mockCallback} />);

  const titleTextBox = screen.getByPlaceholderText("write title here");
  const urlTextBox = screen.getByPlaceholderText("write url here");
  const authorTextBox = screen.getByPlaceholderText("write author here");
  const createPostButton = screen.getByText("create");

  await user.type(titleTextBox, "a title ..");
  await user.type(urlTextBox, "a url ..");
  await user.type(authorTextBox, "an author ..");
  await user.click(createPostButton);

  expect(mockCallback.mock.calls).toHaveLength(1);
  expect(mockCallback.mock.calls[0][0]).toBe("a title ..");
  expect(mockCallback.mock.calls[0][1]).toBe("an author ..");
  expect(mockCallback.mock.calls[0][2]).toBe("a url ..");
});
