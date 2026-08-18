import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, test, vi, beforeEach } from "vitest";
import { useAuth } from "../auth/hooks/useAuth";
import { authService } from "../auth/services/AuthService";
import { useLoginForm } from "../auth/hooks/useLoginForm";

vi.mock("../auth/hooks/useAuth", () => ({
  useAuth: vi.fn(),
}));

vi.mock("../auth/services/AuthService", () => ({
  authService: {
    login: vi.fn(),
  },
}));

describe("useLoginForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAuth).mockReturnValue({
      isAuthenticated: false,
      isLoadingSession: false,
      loginSession: vi.fn(),
      logout: vi.fn(),
    });
  });

  test("should redirect to history after successful login", async () => {
    vi.mocked(authService.login).mockResolvedValue({
      data: { token: "test-token" },
    } as never);

    const LoginHarness = () => {
      const { register, handleSubmit } = useLoginForm();

      return (
        <form onSubmit={handleSubmit}>
          <input aria-label="email" {...register("email")} />
          <input
            aria-label="password"
            type="password"
            {...register("password")}
          />
          <button type="submit">Login</button>
        </form>
      );
    };

    render(
      <MemoryRouter initialEntries={["/login"]}>
        <Routes>
          <Route path="/login" element={<LoginHarness />} />
          <Route path="/history" element={<div>History page</div>} />
          <Route path="/calculator" element={<div>Calculator page</div>} />
        </Routes>
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByLabelText("email"), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByLabelText("password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(screen.getByText("History page")).toBeInTheDocument();
    });
  });
});
