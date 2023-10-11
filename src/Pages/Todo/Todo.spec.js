import { screen, waitFor, render } from "@testing-library/react";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { server } from "tests/server";
import { Todos } from "./Todos";
import { apiSlice } from "../../store";

describe("Todos", () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it("should display todos", async () => {
    render(
      <ApiProvider api={apiSlice}>
        <Todos />
      </ApiProvider>
    );

    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.queryByText(/No Data/i)).not.toBeInTheDocument()
    );

    await waitFor(() => {
      const button = screen.getByText("temporibus atque", { exact: false });
      expect(button).toBeInTheDocument();
    });
  });
});
