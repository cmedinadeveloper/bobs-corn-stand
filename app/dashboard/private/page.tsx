import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export default async function PrivatePage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <div className="p-8">
      <div className="text-corn-yellow-900">Welcome, {data.user.email}!</div>
      <p>Hello {data.user.email}</p>
      <table className="mt-4 border border-gray-300">
        <tbody>
          {Object.entries(data.user).map(([key, value]) => (
            <tr key={key}>
              <td className="px-2 py-1 font-semibold border">{key}</td>
              <td className="px-2 py-1 border">{String(value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
