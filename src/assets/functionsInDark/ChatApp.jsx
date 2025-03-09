// import { useState, useEffect } from 'react';
// import { db } from './firebaseConfig';
// import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';

// function ChatApp({ user }) {
//     console.log(user.role);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');

//   useEffect(() => {
//     const q = query(collection(db, "messages"), orderBy("timestamp"));
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       setMessages(snapshot.docs.map(doc => doc.data()));
//     });
//     return () => unsubscribe();
//   }, []);

//   const sendMessage = async () => {
//     if (input.trim() !== "") {
//       await addDoc(collection(db, "messages"), {
//         text: input,
//         timestamp: new Date(),
//         username: user.displayName || "Anonymous", 
//       });
//       setInput("");
//     }
//   };
  
//   return (
//     <div style={{ 
        
//         display: 'flex', 
//         flexDirection: 'column', 
//         height: '100vh', 
//         backgroundColor: user?.role === 'admin' ? 'white' : 'black', 
//         color: user?.role === 'admin' ? 'black' : 'white' 
//       }}>
      
//       <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
//         {messages.map((msg) => (
//         <div key={msg.id} style={{ padding: '5px', borderBottom: '1px solid #ccc' }}>
//             <strong>{msg.username}:</strong> {msg.text}
//         </div>
//         ))}
//       </div>
//       <div style={{ display: 'flex', padding: '10px', borderTop: '1px solid #ccc' }}>
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           style={{ flex: 1, padding: '5px' }}
//           placeholder="Type a message..."
//         />              
//         <button onClick={sendMessage} style={{ marginLeft: '10px', padding: '5px 10px' }}>
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ChatApp;
