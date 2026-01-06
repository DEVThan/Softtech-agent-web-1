
interface AgentProfile {
  name: string;
  email: string;
  // Add other fields as per your API response
}

interface PageProps {
  params: Promise<{ id: string }>;
}

const AgentProfilePage = async ({ params }: PageProps) => {
  const { id } = await params;

  let profileData: AgentProfile | null = null;
  let error: string | null = null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/agent/profile/${id}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch profile: ${res.statusText}`);
    }
    profileData = await res.json();
  } catch (err: unknown) {
    error = err instanceof Error ? err.message : "Unknown error";
  }

  return (
    <div>
      <h1>Agent Profile for ID: {id}</h1>
      {error && <p className="text-red-500">Error: {error}</p>}
      {profileData ? (
        <div>
          <p>Name: {profileData.name}</p>
          <p>Email: {profileData.email}</p>
          {/* Render other profile data here */}
        </div>
      ) : (
        !error && <p>Loading profile data...</p>
      )}
    </div>
  );
};

export default AgentProfilePage;
