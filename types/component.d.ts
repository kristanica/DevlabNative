type ScaleModalPayload = {
  visibility: boolean;
  scaleStyle: AnimatedStyle<ViewStyle>;
  closeModal: () => void;
  onConfirm?: () => void;
};

type AchievementContainerPayload = {
  data: any;
  index: number;
  selectedCategory: string;
  isUnlocked: boolean;
  isClaimed: boolean;
  claimMutation: any;
};

type AchievementProgressBarProps = {
  name: string;
  progress: number;
};

type AdminLessonContainerPayload = {
  itemContents: {
    title: string;
    description: string;
  };
  index: number;
};

type AdminUserContainerPayload = {
  allUsersInformation: {
    id?: string;
    username?: string;
    email?: string;
    userLevel?: number;
    isSuspended?: boolean;

    isAdmin?: boolean;
    profileImage?: string;
    backgroundImage?: string;
    levelCount: any;
    isAccountSuspended: boolean;
  };
  mutation: () => void;
  deleteAccount: () => void;
  index: number;
  activeLevel: any;
  loading: any;
};

type DropDownMenuPayload = {
  onSelect: (item: string) => void;
  placeHolder: string;
  value: string;
};

type InputContainerForAdminPayload = {
  title: string;
  placeholder?: string;
  value: string | number;
  setValue: (val: string) => void;
  numeric: boolean;
};

type BlockInputSelectorPayload = {
  block: {
    id: number;
    value: string;
    type: string;
  };
  blockType: string;
  dispatch: React.ActionDispatch<any>;
  index: number;
};
type StageInformation = {
  type?: string;
  title: string;
  description: string;
  isHidden?: boolean;
};

type StagesContainerPayload = {
  stageInformation: StageInformation;
  index: number;
  isLocked?: boolean;
  id?: string;
};

type CodeEditorPayload = {
  html?: string;
  css?: string;
  js?: string;
};

type CodeMirrorPayload = {
  webRef: RefObject<WebView | null>;
  receivedCode: CodeEditorPayload | undefined;
  setReceivedCode: React.Dispatch<
    React.SetStateAction<CodeEditorPayload | undefined>
  >;
  logs: any; //FIXME:  change to appropriate type definition
  setLogs: any; //FIXME:  change to appropriate type definition
  terminalRef: RefObject<BottomSheet | null>;
};

type CodeMirrorDatabasePayload = {
  queryRecievedCode: string | undefined;
  setQueryRecievedCode: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  query: string | undefined;
  setQuery: React.Dispatch<React.SetStateAction<string | undefined>>;
  tableStyle: string;
};

type ExperienceBarPayload = {
  userExp: number;
  treshold: number;
  userLevel: number;
};

//ADMIN
type BrainBytesChoicesPayload = {
  a: string;
  b: string;
  c: string;
  d: string;
  correctAnswer: string;
};
type BlockPayload = {
  id: number;
  type: string;
  value: string;
};

type stageDataPayload = {
  title?: string | undefined;
  description?: string | undefined;
  isHidden?: boolean | undefined;
  type?: string | undefined;
  instruction?: string | undefined;
  codingInterface?: string | undefined;
  hint?: string | undefined;
  timer?: number | undefined;
  choices?: BrainBytesChoicesPayload;
  blocks?: BlockPayload[];
  copyCode?: string | undefined;
  videoPresentation?: string | undefined;
  replicationFile?: string | undefined;
};
type StateDispatchPayload = {
  state: State; //FIXME:  change to appropriate type definition
  dispatch: React.ActionDispatch<any>; //FIXME:  change to appropriate type definition
};

type gameComponentPayload = StateDispatchPayload & {
  stageData: stageDataPayload;
  type: string;
  setReplicateFile: React.Dispatch<React.SetStateAction<string | undefined>>;
  setVideoPresentation: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
};

type CodeCrafterPayload = StateDispatchPayload & {
  setReplicateFile: React.Dispatch<React.SetStateAction<string | undefined>>;
};

//Stages
type CurrentStageDataPayload = {
  currentStageData: stageDataPayload;
};

type LessonContainerPayload = {
  levelInformation: {
    id: string;
    title: string;
    description: string;
  };
  index: number;
  isLocked: boolean | undefined;
  icon: "cube" | "logo-javascript" | "logo-html5" | "logo-css3";
};

type OnBoardingItem = {
  id: number;
  lottie: string;
  title: string;
  subtitle: string;
  description: string;
  background: string;
};
type OnboardingItemPayload = {
  xVal: SharedValue<number>;
  item: OnBoardingItem;

  index: number;
};
type OnBoardingDotPayload = {
  item: OnBoardingItem[];
  xVal: SharedValue<number>;
};

type UserInventoryItemsPayload = {
  Icon: string;
  quantity: number;
  title: string;
};

type HomeLessonPayload = {
  name: string;
  color: string;
  index: number;
  icon: any;
  children: ReactNode;
};

type InputBoxPayload = {
  placeHolder: string;
  value: string;
  setValue: (value: string) => void;

  isPassword?: boolean;
};
