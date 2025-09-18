import RoundUpSettings from "@/components/payment/RoundUpSettings";

const RoundUp = () => {
  return (
    <>
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <RoundUpSettings />
        </div>
      </div>
    </>
  );
};

export default RoundUp;
