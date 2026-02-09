import { Badge, Button, Card, Container, Input, Section } from "../../ui";

const Contact = () => {
  return (
    <Container className="mt-10">
      <Section
        title="Contact Fooder"
        subtitle="Questions, partnerships, or feedback — we’d love to hear from you."
      >
        <div className="grid gap-6 lg:grid-cols-3">
          <Card variant="solid" size="lg" className="lg:col-span-2">
            <form className="grid gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-600">
                    Full Name
                  </label>
                  <Input placeholder="Jane Doe" />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-600">
                    Email
                  </label>
                  <Input type="email" placeholder="jane@fooder.com" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-600">
                  Topic
                </label>
                <Input placeholder="Partnership, feedback, or support" />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-600">
                  Message
                </label>
                <textarea
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                  rows={5}
                  placeholder="Tell us what you need..."
                />
              </div>
              <div className="flex items-center justify-between">
                <Badge size="sm">Replies within 24 hours</Badge>
                <Button type="button">Send message</Button>
              </div>
            </form>
          </Card>

          <Card size="lg" className="h-full">
            <h3 className="text-lg font-semibold text-gray-900">Reach us</h3>
            <p className="mt-2 text-sm text-gray-600">
              We’re available for partnerships, product feedback, and design
              discussions.
            </p>
            <div className="mt-4 space-y-3 text-sm text-gray-700">
              <div>
                <p className="font-semibold">Email</p>
                <p>hello@fooder.app</p>
              </div>
              <div>
                <p className="font-semibold">Office</p>
                <p>Dubai · Madrid · Remote EU</p>
              </div>
              <div>
                <p className="font-semibold">Hours</p>
                <p>Mon–Fri, 9am–6pm</p>
              </div>
            </div>
          </Card>
        </div>
      </Section>
    </Container>
  );
};

export default Contact;
