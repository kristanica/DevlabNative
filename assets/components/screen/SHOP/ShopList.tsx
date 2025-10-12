import { FlatList } from "react-native";
import ShopItem from "../../ShopItem";
type ShopListProps = {
  shopItem: any;
};
const ShopList = ({ shopItem }: ShopListProps) => {
  return (
    <>
      <FlatList
        bounces
        showsVerticalScrollIndicator={false}
        data={shopItem}
        renderItem={({ item, index }: { item: any; index: number }) => (
          <ShopItem {...item} index={index} key={item.id} />
        )}
        keyExtractor={(item) => item.id}
        className="flex-[5] border-[#36334B] border-2 rounded-[10px] p-3"
        contentContainerStyle={{ paddingBottom: 8 }}
      />
    </>
  );
};

export default ShopList;
