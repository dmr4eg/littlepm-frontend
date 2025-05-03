// // url = /profile/
// // 1. get user api info
// // 2. show user info
// // 3. return button redirect to root route
//
// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import api from '../api/api';
//
// interface UserProfile {
//     id: string;
//     name: string;
//     email: string;
//     avatar_url?: string;
// }
//
// const ProfilePage = () => {
//     const router = useRouter();
//     const [profile, setProfile] = useState<UserProfile | null>(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState<Error | null>(null);
//
//     useEffect(() => {
//         const fetchProfile = async () => {
//             try {
//                 // TODO: Replace with actual user profile endpoint when available
//                 const response = await new Promise<UserProfile>((resolve, reject) => {
//                     api.membersGet(1, 0, (error: Error | null, data: any) => {
//                         if (error) reject(error);
//                         else resolve({
//                             id: data.id?.userUuid || '',
//                             name: data.member_name || '',
//                             email: data.email || '',
//                             avatar_url: data.avatar_url
//                         });
//                     });
//                 });
//                 setProfile(response);
//             } catch (err) {
//                 setError(err instanceof Error ? err : new Error('Failed to fetch user profile'));
//             } finally {
//                 setIsLoading(false);
//             }
//         };
//
//         fetchProfile();
//     }, []);
//
//     if (isLoading) {
//         return <div>Loading...</div>;
//     }
//
//     if (error) {
//         return <div>Error: {error.message}</div>;
//     }
//
//     if (!profile) {
//         return <div>Profile not found</div>;
//     }
//
//     return (
//         <div className="profile-page">
//             <h1>Profile</h1>
//             <button
//                 onClick={() => router.push('/')}
//                 className="back-button"
//             >
//                 Back to Home
//             </button>
//
//             <div className="profile-content">
//                 {profile.avatar_url && (
//                     <img
//                         src={profile.avatar_url}
//                         alt={profile.name}
//                         className="profile-avatar"
//                     />
//                 )}
//                 <div className="profile-info">
//                     <h2>{profile.name}</h2>
//                     <p>{profile.email}</p>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default ProfilePage;