import { Container, DashboardLayout } from "@/components/layout";
import { PageSkeleton } from "@/components/common";

export default function Loading() {
  return (
    <DashboardLayout crumb="People">
      <Container size="2xl" className="space-y-6">
        <PageSkeleton variant="table" />
      </Container>
    </DashboardLayout>
  );
}
