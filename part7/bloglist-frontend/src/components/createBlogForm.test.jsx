import React, { useReducer } from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateBlogForm from "./createBlogForm";

test("details are right when a new blog is created", async () => {
  let title;
  let author;
  let url;
  const mockHandler = jest.fn((x) => {
    return (title = x.title), (author = x.author), (url = x.url);
  });
  const { container } = render(
    <CreateBlogForm handleCreateBlog={mockHandler} />,
  );
  const ue = userEvent.setup();
  const sendButton = screen.getByText("create");
  const titleInput = container.querySelector("#title");
  const authorInput = container.querySelector("#author");
  const urlInput = container.querySelector("#url");
  expect(sendButton).toBeDefined();
  expect(titleInput).toBeDefined();
  expect(authorInput).toBeDefined();
  expect(urlInput).toBeDefined();
  await ue.type(titleInput, "Friday Mornings");
  await ue.type(authorInput, "Alicia Keys");
  await ue.type(urlInput, "www.fridaymornings.com");
  await ue.click(sendButton);
  expect(title).toBe("Friday Mornings");
  expect(author).toBe("Alicia Keys");
  expect(url).toBe("www.fridaymornings.com");
});
