import { Badge, Button, Card, Container, Section } from "../../ui";

const About = () => {
  return (
    <Container className="mt-10">
      <Card size="lg" className="motion-fade">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <Badge size="sm">About Fooder</Badge>
            <h1 className="section-title mt-3">A smarter way to discover food</h1>
            <p className="mt-3 max-w-2xl text-sm text-gray-600">
              Fooder is a product-focused food discovery experience that blends
              delightful design with fast decision-making. We keep the interface
              clean, the filters useful, and the browsing flow frictionless.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Badge size="sm">Curated lists</Badge>
              <Badge size="sm">Fast decisions</Badge>
              <Badge size="sm">Crafted UI</Badge>
            </div>
          </div>
          <div className="w-full max-w-sm rounded-2xl bg-gradient-to-br from-orange-400 via-orange-500 to-rose-500 p-5 text-white shadow-lg">
            <p className="text-xs uppercase tracking-[0.25em]">Mission</p>
            <p className="mt-2 text-lg font-bold">Make every food choice feel easy.</p>
            <p className="mt-2 text-xs text-white/80">
              Built with a product mindset and a strong emphasis on UX.
            </p>
          </div>
        </div>
      </Card>

      <Section
        title="What we focus on"
        subtitle="Design and engineering decisions we prioritize as a product team."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <Card variant="solid" size="md">
            <h3 className="text-lg font-semibold text-gray-900">Experience</h3>
            <p className="mt-2 text-sm text-gray-600">
              Clear hierarchy, calm visuals, and confident navigation across
              the flow.
            </p>
          </Card>
          <Card variant="solid" size="md">
            <h3 className="text-lg font-semibold text-gray-900">Performance</h3>
            <p className="mt-2 text-sm text-gray-600">
              Lightweight screens, lazy-loaded routes, and thoughtful caching.
            </p>
          </Card>
          <Card variant="solid" size="md">
            <h3 className="text-lg font-semibold text-gray-900">Reliability</h3>
            <p className="mt-2 text-sm text-gray-600">
              Graceful fallbacks and resilient UI that never feels broken.
            </p>
          </Card>
        </div>
      </Section>

      <Section
        title="Meet the product team"
        subtitle="A small, cross‑functional crew building a polished experience."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { name: "Product & UX", role: "Experience Strategy" },
            { name: "Frontend", role: "Interface Engineering" },
            { name: "Data & Insights", role: "Discovery Signals" },
          ].map((member) => (
            <Card key={member.name} variant="outline" size="md">
              <div className="h-10 w-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                {member.name[0]}
              </div>
              <h4 className="mt-3 text-sm font-semibold text-gray-900">
                {member.name}
              </h4>
              <p className="text-xs text-gray-500">{member.role}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Want to collaborate?">
        <Card variant="solid" size="md" className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-gray-600">
            We love building thoughtful product experiences and experimenting
            with modern UI patterns.
          </p>
          <Button>Get in touch</Button>
        </Card>
      </Section>
    </Container>
  );
};

export default About;
