// import React, { useEffect, useState } from "react";
// import { 
//   SafeAreaView, 
//   ScrollView, 
//   Text, 
//   TouchableOpacity, 
//   View, 
//   Image, 
//   StyleSheet, 
//   Dimensions 
// } from "react-native";

// const { width, height } = Dimensions.get("window");

// interface CampaignSubmission {
//   id: string;
//   campaignTitle: string;
//   status: "In Progress" | "Completed";
//   imageUrl: string;
// }

// export default function MyCampaignsScreen() {
//   const [submissions, setSubmissions] = useState<CampaignSubmission[]>([]);
//   const [activeTab, setActiveTab] = useState<"inProgress" | "completed">("inProgress");

//   useEffect(() => {
//     const mock = [
//       {
//         id: "1",
//         campaignTitle: "Share Your Audio Experience",
//         status: "In Progress",
//         imageUrl:
//           "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/9x0qst8h_expires_30_days.png",
//       },
//     ];
//     setSubmissions(mock);
//   }, []);

//   const inProgress = submissions.filter((s) => s.status === "In Progress");
//   const completed = submissions.filter((s) => s.status === "Completed");

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
//       {/* Tabs */}
//       <View style={styles.tabBar}>
//         <TouchableOpacity
//           onPress={() => setActiveTab("inProgress")}
//           style={[styles.tab, activeTab === "inProgress" && styles.activeTab]}
//         >
//           <Text style={[styles.tabText, activeTab === "inProgress" && styles.activeText]}>
//             In Progress
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={() => setActiveTab("completed")}
//           style={[styles.tab, activeTab === "completed" && styles.activeTab]}
//         >
//           <Text style={[styles.tabText, activeTab === "completed" && styles.activeText]}>
//             Completed
//           </Text>
//         </TouchableOpacity>
//       </View>

//       {/* List */}
//       <ScrollView style={{ padding: 16 }}>
//         {activeTab === "inProgress" && (
//           inProgress.length > 0 ? (
//             inProgress.map((s) => (
//               <View key={s.id} style={styles.card}>
//                 <Image source={{ uri: s.imageUrl }} style={styles.img} />
//                 <Text style={styles.title}>{s.campaignTitle}</Text>
//                 <Text style={styles.status}>Waiting for approval</Text>
//               </View>
//             ))
//           ) : (
//             <Text style={styles.empty}>No in-progress campaigns</Text>
//           )
//         )}

//         {activeTab === "completed" && (
//           completed.length > 0 ? (
//             completed.map((s) => (
//               <View key={s.id} style={styles.card}>
//                 <Image source={{ uri: s.imageUrl }} style={styles.img} />
//                 <Text style={styles.title}>{s.campaignTitle}</Text>
//                 <Text style={[styles.status, { color: "green" }]}>
//                   Approved!
//                 </Text>
//               </View>
//             ))
//           ) : (
//             <Text style={styles.empty}>No completed campaigns</Text>
//           )
//         )}
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   tabBar: { flexDirection: "row", backgroundColor: "#DAE6FF", margin: 16, borderRadius: 8 },
//   tab: { flex: 1, padding: 12, alignItems: "center" },
//   activeTab: { backgroundColor: "#fff", borderRadius: 8 },
//   tabText: { fontSize: width * 0.04, color: "#777", fontWeight: "bold" },
//   activeText: { color: "#000" },
//   card: {
//     backgroundColor: "#fff",
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 12,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 4,
//   },
//   img: { width: width * 0.15, height: width * 0.15, marginBottom: 8 },
//   title: { fontSize: width * 0.04, fontWeight: "bold" },
//   status: { fontSize: width * 0.035, color: "#888", marginTop: 4 },
//   empty: { textAlign: "center", color: "#999", marginTop: 40 },
// });
