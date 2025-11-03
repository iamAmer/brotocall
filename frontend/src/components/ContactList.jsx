import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import { useAuthStore } from "../store/useAuthStore";

function ContactList() {
  const { getAllContacts, allContacts, setSelectedUser, isUsersLoading } =
    useChatStore();
  const { onlineUsers } = useAuthStore();

  const [query, setQuery] = useState("");

  // fetch contacts when component mounts and whenever query changes (debounced)
  useEffect(() => {
    const t = setTimeout(() => {
      getAllContacts(query);
    }, 300);

    return () => clearTimeout(t);
  }, [getAllContacts, query]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;

  return (
    <>
      <div className="mb-3">
        <div className="relative">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search users by name or email"
            className="w-full bg-slate-800/60 placeholder:text-slate-400 text-slate-200 rounded-md py-2 px-3"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {allContacts.length === 0 ? (
        <div className="text-slate-400">No users found.</div>
      ) : (
        allContacts.map((contact) => (
          <div
            key={contact._id}
            className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
            onClick={() => setSelectedUser(contact)}
          >
            <div className="flex items-center gap-3">
              <div
                className={`avatar ${
                  onlineUsers.includes(contact._id) ? "online" : "offline"
                }`}
              >
                <div className="size-12 rounded-full">
                  <img src={contact.profilePic || "/avatar.png"} />
                </div>
              </div>
              <h4 className="text-slate-200 font-medium">{contact.userName}</h4>
            </div>
          </div>
        ))
      )}
    </>
  );
}
export default ContactList;
