import connectDB from '@/config/database';
import Message from '@/models/Message';
import MessageCard from '@/components/MessageCard';
import '@/models/Property';
import { convertToSerializableObject } from '@/utils/convertToObject';
import getSessionUser from '@/utils/getSessionUser';

const MessagesPage = async () => {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.id) {
    return <div>Please log in to view your messages.</div>;
  }
  const { id } = sessionUser;

  const readMessages = await Message.find({ recipient: id, read: true })
    .populate('sender')
    .populate('property')
    .sort({ createdAt: -1 })
    .lean();

  const unreadMessages = await Message.find({ recipient: id, read: false })
    .populate('sender')
    .populate('property')
    .sort({ createdAt: -1 })
    .lean();

  const messages = [...unreadMessages, ...readMessages];

  const serializedMessages = messages.map((messageDoc) => {
    const message = convertToSerializableObject(messageDoc);
    message.sender = convertToSerializableObject(messageDoc.sender);
    message.property = convertToSerializableObject(messageDoc.property);
    return message;
  });


  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4">
          <h1 className="text-3xl font-bold mb-4">Your Messages</h1>
          <div className="space-y-4">
            {serializedMessages.length === 0 ? (
              <p>No messages found.</p>
            ) : (
              serializedMessages.map((message) => (
                <MessageCard key={message._id} message={message} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessagesPage;
