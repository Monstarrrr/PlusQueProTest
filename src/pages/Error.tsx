import { useRouteError } from "react-router-dom";

export const Error = () => {
  const error: unknown = useRouteError();

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      {(error as Error) && (
        <p>{(error as Error).message}</p>
      )}
    </div>
  )
}