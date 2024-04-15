import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

const blog = {
  title: "Component testing is done with react-testing-library",
  likes: 5,
  url: "test url",
  author: "the author",
};

test("renders content correctly initially", () => {
  render(<Blog blog={blog} />);

  const titleElement = screen.getByText(blog.title);
  const authorElement = screen.getByText(blog.author);
  const likesElement = screen.getByText(`likes ${blog.likes}`);
  expect(titleElement).toBeDefined();
  expect(authorElement).toBeDefined();
  expect(likesElement).not.toBeVisible();
});

test("when button clicked contents are visible", async () => {
  render(<Blog blog={blog} />);

  const user = userEvent.setup();
  const button = screen.getByText("show");
  await user.click(button);

  const likesElement = screen.getByText(`likes ${blog.likes}`);
  const urlElement = screen.getByText(blog.url);

  expect(likesElement).toBeVisible();
  expect(urlElement).toBeVisible();
});

test("like function is called twice if the button is called twice", async () => {
  const mockLikeHandler = vi.fn();

  render(<Blog blog={blog} likePost={mockLikeHandler} />);

  const user = userEvent.setup();
  const button = screen.getByText("show");
  await user.click(button);

  const likeButton = screen.getByText(`Like`);
  await user.click(likeButton);
  await user.click(likeButton);

  expect(mockLikeHandler.mock.calls).toHaveLength(2);
});
