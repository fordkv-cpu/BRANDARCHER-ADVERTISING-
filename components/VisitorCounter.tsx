import React, { useEffect, useState } from 'react';
import { doc, onSnapshot, updateDoc, increment, setDoc, getDoc, getDocFromServer } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { Users } from 'lucide-react';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

const handleFirestoreError = (error: unknown, operationType: OperationType, path: string | null) => {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  // We don't throw here to avoid crashing the whole UI, but we log it for the system to see
};

const VisitorCounter: React.FC = () => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const statsRef = doc(db, 'stats', 'global');

    // Connection test as per guidelines
    const testConnection = async () => {
      try {
        await getDocFromServer(doc(db, 'test', 'connection'));
      } catch (error) {
        if (error instanceof Error && error.message.includes('the client is offline')) {
          console.error("Please check your Firebase configuration.");
        }
      }
    };
    testConnection();

    // 1. Increment the counter once per session
    const incrementCounter = async () => {
      const hasVisited = sessionStorage.getItem('brandarcher_visited');
      
      if (!hasVisited) {
        try {
          const docSnap = await getDoc(statsRef);
          if (docSnap.exists()) {
            await updateDoc(statsRef, {
              visitorCount: increment(1)
            });
          } else {
            // Initial creation if document doesn't exist
            await setDoc(statsRef, { visitorCount: 1 });
          }
          sessionStorage.setItem('brandarcher_visited', 'true');
        } catch (error) {
          handleFirestoreError(error, OperationType.WRITE, 'stats/global');
        }
      }
    };

    incrementCounter();

    // 2. Listen for real-time updates
    const unsubscribe = onSnapshot(statsRef, (doc) => {
      if (doc.exists()) {
        setCount(doc.data().visitorCount);
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'stats/global');
    });

    return () => unsubscribe();
  }, []);

  if (count === null) return null;

  return (
    <div className="flex items-center gap-3 px-3 py-1.5 bg-zinc-900/50 border border-zinc-800 rounded-full">
      <div className="relative">
        <Users size={14} className="text-red-600" />
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full border-2 border-black animate-pulse" />
      </div>
      <div className="flex flex-col">
        <span className="text-[12px] font-black text-white leading-none">{count.toLocaleString()}</span>
        <span className="text-[7px] font-bold uppercase tracking-widest text-zinc-500">Live Visitors</span>
      </div>
    </div>
  );
};

export default VisitorCounter;
