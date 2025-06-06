type Result<T> = {
  data?: T | null;
  error?: string | null;
};

export const tryCatchHandler = async <T>(
  fn: () => Promise<T>
): Promise<Result<T>> => {
  try {
    const data = await fn();
    return { data };
  } catch (error: any) {
    return { error: error?.message || "Something went wrong" };
  }
};
