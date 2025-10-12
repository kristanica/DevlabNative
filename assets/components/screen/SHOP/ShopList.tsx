import { FlashList } from "@shopify/flash-list";
import ShopItem from "../../ShopItem";
type ShopListProps = {
  shopItem: any;
};
const ShopList = ({ shopItem }: ShopListProps) => {
  return (
    <>
      <FlashList
        bounces
        showsVerticalScrollIndicator={false}
        data={shopItem}
        renderItem={({ item, index }: { item: any; index: number }) => (
          <ShopItem {...item} index={index} key={item.id} />
        )}
        keyExtractor={(item) => item.id}
        className="flex-[5] border-[#36334B] border-2 rounded-[10px]"
        contentContainerStyle={{ paddingBottom: 8 }}
        estimatedItemSize={269}
      />
    </>
  );
};

export default ShopList;
