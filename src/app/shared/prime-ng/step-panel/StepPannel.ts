export class StepPanneleeee {
  public static config = {
    contentWrapper: '!h-full'
  };

  public static a = {
    root: 'h-full flex flex-col'
  };

  // 2. Le conteneur des panels : Il doit grandir (flex-1) pour occuper tout l'espace sous les headers
  public static b = {
    root: 'flex-1 flex flex-col min-h-0'
  };

  // 3. Le panel individuel : Il doit faire 100% de la hauteur de son parent
  public static test = {
    root: 'h-full flex flex-col'
  };
}
