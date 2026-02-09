import { useRouteError, Link } from "react-router-dom";
import { Button, Card, Container } from "../ui";

const Error = () => {
  const err = useRouteError();

  return (
    <Container className="mt-16">
      <Card size="lg" className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
          Something went wrong
        </p>
        <h1 className="section-title mt-3">We couldn’t find that page</h1>
        <p className="mt-3 text-sm text-gray-600">
          {err?.status ? `${err.status}: ${err.statusText}` : "Unexpected error"}
        </p>
        <div className="mt-6">
          <Link to="/">
            <Button>Go back home</Button>
          </Link>
        </div>
      </Card>
    </Container>
  );
};

export default Error;
