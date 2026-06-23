import DashboardDemoDesktop from "./DashboardDemoDesktop";
import DashboardDemoMobile from "./DashboardDemoMobile";

export default function DashboardDemo() {
  return (
    <>
      <div className="hidden lg:block">
        <DashboardDemoDesktop />
      </div>

      <div className="lg:hidden">
        <DashboardDemoMobile />
      </div>
    </>
  );
}