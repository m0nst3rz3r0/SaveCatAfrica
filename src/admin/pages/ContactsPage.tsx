import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useAdminToken } from "../../lib/auth";
import { formatDate } from "../../lib/format";
import { useContacts } from "../../hooks/useSiteData";

export function ContactsPage() {
  const { token } = useAdminToken();
  const contacts = useContacts(token);
  const markRead = useMutation(api.contacts.markRead);

  return (
    <div>
      <h1 className="text-3xl font-bold text-navy mb-6">Contact Inbox</h1>
      <div className="space-y-4">
        {(contacts ?? []).map((c) => (
          <div
            key={c._id}
            className={`bg-white rounded-xl border p-6 ${!c.read ? "border-terracotta" : ""}`}
          >
            <div className="flex justify-between items-start mb-2">
              <p className="font-bold text-navy">
                {c.firstName} {c.lastName}
                {!c.read && (
                  <span className="ml-2 text-xs bg-terracotta text-white px-2 py-0.5 rounded">New</span>
                )}
              </p>
              <span className="text-xs text-muted">{formatDate(c.createdAt)}</span>
            </div>
            <p className="text-sm text-terracotta mb-2">{c.email}</p>
            <p className="text-muted text-sm whitespace-pre-wrap">{c.message}</p>
            {!c.read && token && (
              <button
                className="mt-4 text-xs font-bold text-navy hover:text-terracotta"
                onClick={() => markRead({ token, id: c._id })}
              >
                Mark as read
              </button>
            )}
          </div>
        ))}
        {contacts?.length === 0 && (
          <p className="text-muted text-center py-12">No messages yet.</p>
        )}
      </div>
    </div>
  );
}
