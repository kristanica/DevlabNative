import AdminProtectedRoutes from "@/assets/components/AdminProtectedRoutes";
import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import { db } from "@/assets/constants/constants";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
type userDataProps = {
  username: string;
  email: string;
  userLeveL: number;
  suspend: boolean;
  uid?: any;
};

const UserManagement = () => {
  const [user, setUser] = useState<userDataProps[]>([]);
  useEffect(() => {
    try {
      const userRef = collection(db, "Users");
      onSnapshot(userRef, (snapshot: any) => {
        const userData: userDataProps[] = snapshot.docs.map((doc: any) => {
          return {
            uid: doc.id,
            ...(doc.data() as userDataProps),
          };
        });
        setUser(userData);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const suspend = async (uid: any, isSuspended: boolean) => {
    const userRef = doc(db, "Users", uid);

    await updateDoc(userRef, {
      suspend: !isSuspended,
    });
  };

  return (
    <AdminProtectedRoutes>
      <View className="flex-[1] bg-accent">
        <CustomGeneralContainer>
          <View>
            <Text className="text-white font-exoBold text-3xl">
              User Management
            </Text>
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            bounces={false}
            data={user}
            renderItem={({ item }) => (
              <View className="bg-background flex-row h-[200px] my-2 mx-3 rounded-2xl border-[#56EBFF] border-[1px]">
                <View className="flex-[.5] justify-center items-center ">
                  <Image
                    style={{
                      height: 100,
                      width: 100,
                      borderRadius: 40,
                    }}
                    source={require("@/assets/images/profile.png")}
                  ></Image>
                </View>
                <View
                  className="flex-[2] p-2 "
                  style={{
                    borderColor: "#C1ADAD",
                    borderLeftWidth: 2,
                    marginVertical: 10,
                  }}
                >
                  <Text className="text-white font-exoBold">
                    USERNAME:
                    <Text className="text-white font-exoLight">
                      {" "}
                      {item.username}
                    </Text>
                  </Text>
                  <Text className="my-3 text-white font-exoBold">
                    EMAIL:
                    <Text className="font-exoLight"> {item.email}</Text>
                  </Text>

                  <Text className="text-white font-exoBold">
                    STATUS:
                    <Text
                      className="font-exoLight "
                      style={{ color: item.suspend ? "red" : "green" }}
                    >
                      {"  "}
                      {item.suspend ? "Suspended" : "Active"}
                    </Text>
                  </Text>
                  <View className="flex-row justify-evenly items-center flex-[1]">
                    <TouchableOpacity
                      disabled={item.suspend}
                      onPress={() => suspend(item.uid, item.suspend)}
                    >
                      <Text className="text-white bg-button py-2 px-3 self-start rounded-2xl">
                        Suspend
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      disabled={!item.suspend}
                      onPress={() => suspend(item.uid, item.suspend)}
                    >
                      <Text className="text-white bg-button py-2 px-3 self-start rounded-2xl">
                        Activate
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />
        </CustomGeneralContainer>
      </View>
    </AdminProtectedRoutes>
  );
};

export default UserManagement;
