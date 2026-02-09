import { Badge, Button, Card, Section } from "../../ui";

const Recommendations = ({ items = [], reasons = {}, loading, onRefresh }) => {
  return (
    <Section
      title="Recommended for you"
      subtitle="Personalized picks with quick explanations."
      actions={
        onRefresh ? (
          <Button size="sm" variant="secondary" onClick={onRefresh}>
            Refresh
          </Button>
        ) : null
      }
    >
      {loading ? (
        <div className="text-sm text-gray-500">Generating recommendations…</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          {items.map((res) => (
            <Card key={res?.info?.id} variant="outline" size="md">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {res?.info?.name}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {(res?.info?.cuisines || []).slice(0, 2).join(", ")}
                  </p>
                </div>
                <Badge size="sm">★ {res?.info?.avgRating || "—"}</Badge>
              </div>
              <p className="mt-3 text-sm text-gray-600">
                {reasons[res?.info?.id] ||
                  "Picked for strong ratings and quick delivery."}
              </p>
            </Card>
          ))}
        </div>
      )}
    </Section>
  );
};

export default Recommendations;
