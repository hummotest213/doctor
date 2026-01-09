import AvailableDoctor from "@/components/Doctors/AvailableDoctor";
import DoctorProfileContent from "@/components/Doctors/DoctorProfileContent";
import Navbar from "@/components/Layout/Navbar";

export default function Page() {
  return (
    <>
      <Navbar />

      <DoctorProfileContent />

      <AvailableDoctor />
    </>
  );
}
