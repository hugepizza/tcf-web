import { UAParser } from "ua-parser-js";
import { Toaster } from "react-hot-toast";
import { fetchQuery } from "@/lib/server-fetch";
import { z } from "zod";
import { getSessionsOutputSchema } from "@/shared/schemas/auth";

async function Sessions() {
  const { data: sessions } = await fetchQuery<
    z.infer<typeof getSessionsOutputSchema>
  >({
    path: "/users/sessions",
  });
  console.log("sessions", JSON.stringify(sessions, null, 2));

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>设备信息</th>
            <th>日期</th>
            <th>地点</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sessions?.items.map((session) => (
            <tr key={session.id}>
              <td>{`${UAParser(session.ua).browser.name}, ${
                UAParser(session.ua).os.name
              }`}</td>
              <td>{new Date(session.lastActicveAt).toLocaleString()}</td>
              <td>{`${session.city}, ${session.country}`}</td>
              <td>{"登出"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Toaster />
    </div>
  );
}

export default Sessions;
