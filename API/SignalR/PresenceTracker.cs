namespace API.SignalR
{
    public class PresenceTracker
    {
        // Summary
        // OnlineUser provide dictionary with key is username and List connection IDs.
        // User can login from browser, tablets, or phones,... each time login will generate new connectionId and add to List.
        private static readonly Dictionary<string, List<string>> OnlineUser = new Dictionary<string, List<string>>();

        public Task<bool> UserConnected(string username, string connectionId)
        {
            bool isOnline = false;
            // Because dictionary is not a thread safe type of object, it can be error when multiple concurrent users
            // trying to access this dictionary at the same time. So we must use Lock to lock dictionary until we
            // finish our job.
            lock(OnlineUser)
            {
                if (OnlineUser.ContainsKey(username))
                {
                    OnlineUser[username].Add(connectionId);
                } else
                {
                    OnlineUser.Add(username, new List<string> { connectionId });
                    isOnline = true;
                }
            }

            return Task.FromResult(isOnline);
        }

        public Task<bool> UserDisconnected(string username, string connectionId)
        {
            bool isOffline = false;

            lock(OnlineUser)
            {
                if(!OnlineUser.ContainsKey(username)) return Task.FromResult(isOffline);

                OnlineUser[username].Remove(connectionId);

                if(OnlineUser[username].Count == 0)
                {
                    OnlineUser.Remove(username);
                    isOffline = true;
                }
            }

            return Task.FromResult(isOffline);
        }

        public Task<string[]> GetOnlineUsers()
        {
            string[] onlineUsers;

            lock(OnlineUser) 
            {
                onlineUsers = OnlineUser.OrderBy(k => k.Key).Select(k => k.Key).ToArray();
            }

            return Task.FromResult(onlineUsers);
        }
    }
}