namespace API.SignalR
{
    public class PresenceTracker
    {
        // Summary
        // OnlineUser provide dictionary with key is username and List connection IDs.
        // User can login from browser, tablets, or phones,... each time login will generate new connectionId and add to List.
        private static readonly Dictionary<string, List<string>> OnlineUser = new Dictionary<string, List<string>>();

        public Task UserConnected(string username, string connectionId)
        {
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
                }
            }

            return Task.CompletedTask;
        }

        public Task UserDisconnected(string username, string connectionId)
        {
            lock(OnlineUser)
            {
                if(!OnlineUser.ContainsKey(username)) return Task.CompletedTask;

                OnlineUser[username].Remove(connectionId);

                if(OnlineUser[username].Count == 0)
                {
                    OnlineUser.Remove(username);
                }
            }

            return Task.CompletedTask;
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