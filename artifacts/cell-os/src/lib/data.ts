export type Organelle = {
  id: string;
  name: string;
  osFeature: string;
  explanation: string;
  analogy: string;
  color: string;
};

export const CELL_MAPPINGS: Organelle[] = [
  {
    id: "nucleus",
    name: "Nucleus",
    osFeature: "Kernel / Control Center",
    explanation: "The central governor that manages the phone's fundamental operations, holding the most critical instructions and orchestrating all lower-level hardware interactions.",
    analogy: "Just as the nucleus holds DNA and governs the whole cell, the kernel directs the entire operating system securely from its core.",
    color: "hsl(280, 80%, 60%)" // Purple
  },
  {
    id: "dna",
    name: "DNA / Genome",
    osFeature: "System Code + User Configuration",
    explanation: "The immutable root code combined with your personalized settings that dictate exactly how your device behaves and responds.",
    analogy: "DNA holds the blueprint of life; the system code and your configurations are the immutable core and editable settings that make your phone uniquely yours.",
    color: "hsl(180, 100%, 50%)" // Cyan
  },
  {
    id: "nucleolus",
    name: "Nucleolus",
    osFeature: "Bootloader / System Startup",
    explanation: "The initial sequence that wakes up the device, loading the environment required for everything else to run.",
    analogy: "The nucleolus builds ribosomes and runs first to prepare the cell; the bootloader wakes the hardware and prepares the runtime environment.",
    color: "hsl(320, 80%, 60%)" // Pink
  },
  {
    id: "nuclear-pores",
    name: "Nuclear Pores",
    osFeature: "System APIs / Kernel Calls",
    explanation: "Highly guarded gateways that allow secure communication between user applications and the core operating system.",
    analogy: "Pores control what enters and exits the nucleus; APIs are the controlled gateways routing requests in and out of the kernel.",
    color: "hsl(200, 90%, 60%)" // Light Blue
  },
  {
    id: "cell-membrane",
    name: "Cell Membrane",
    osFeature: "Security & Permissions Layer",
    explanation: "A protective barrier enforcing strict privacy, deciding which apps can access your camera, microphone, or data.",
    analogy: "The membrane is the cell's gatekeeper protecting its contents; the OS permissions layer controls exactly what data leaves or enters your device.",
    color: "hsl(140, 100%, 60%)" // Lime Green
  },
  {
    id: "membrane-receptors",
    name: "Membrane Receptors",
    osFeature: "Sensors & Connectivity",
    explanation: "The physical and digital antennae—touch, NFC, GPS, Wi-Fi, and Bluetooth—that receive signals from the outside world.",
    analogy: "Receptors bind to external molecules to trigger responses; your phone's antennas and sensors receive signals to interact with the environment.",
    color: "hsl(160, 80%, 50%)" // Mint
  },
  {
    id: "mitochondria",
    name: "Mitochondria",
    osFeature: "Power / Battery Management",
    explanation: "The adaptive energy system that efficiently distributes power to where it is needed most to prolong your device's lifespan.",
    analogy: "The powerhouse of the cell; the battery and its intelligent management system act as the ultimate energy plant.",
    color: "hsl(35, 100%, 55%)" // Orange/Amber
  },
  {
    id: "ribosomes",
    name: "Ribosomes",
    osFeature: "App Runtime / Process Execution",
    explanation: "The engines that execute code, turning compiled software instructions into running, usable applications on your screen.",
    analogy: "Ribosomes synthesize proteins from instructions; the app runtime executes binary instructions to spin up active processes.",
    color: "hsl(300, 70%, 65%)" // Magenta
  },
  {
    id: "endoplasmic-reticulum",
    name: "Endoplasmic Reticulum",
    osFeature: "App Framework / System Services",
    explanation: "The massive foundational network of background services and APIs that support running apps and transporting data between them.",
    analogy: "The ER is the cell's transport and assembly network; the OS framework scaffolds and routes resources for applications.",
    color: "hsl(220, 80%, 65%)" // Blue
  },
  {
    id: "golgi-apparatus",
    name: "Golgi Apparatus",
    osFeature: "Notifications + OTA Updates",
    explanation: "The delivery center that packages information (like messages or software updates) and routes them exactly where they need to go.",
    analogy: "The Golgi packages and ships proteins out; your OS notification system and updater packages and delivers critical information.",
    color: "hsl(25, 90%, 60%)" // Peach
  },
  {
    id: "lysosomes",
    name: "Lysosomes",
    osFeature: "Cache Cleanup / Uninstaller",
    explanation: "The digital recycling center that clears out residual junk data, temporary caches, and uninstalls old apps to keep the system fresh.",
    analogy: "Lysosomes break down cellular waste; the system cleaner breaks down digital waste, tying perfectly into Fairphone's recycling ethos.",
    color: "hsl(80, 90%, 50%)" // Yellow-green
  },
  {
    id: "vacuole",
    name: "Vacuole",
    osFeature: "Storage / File System",
    explanation: "The secure vault where all your photos, documents, and downloaded applications are stored persistently.",
    analogy: "A vacuole stores nutrients and water; the file system is the storage reservoir holding your personal data.",
    color: "hsl(190, 70%, 40%)" // Deep Cyan
  },
  {
    id: "cytoplasm",
    name: "Cytoplasm",
    osFeature: "RAM / System Bus",
    explanation: "The fast, fluid medium where active apps temporarily reside while they are open, allowing for rapid multitasking.",
    analogy: "Cytoplasm is the medium everything suspends and operates within; RAM is the fluid memory where active processes run.",
    color: "hsl(260, 60%, 50%)" // Indigo
  },
  {
    id: "cytoskeleton",
    name: "Cytoskeleton",
    osFeature: "UI Framework / Architecture",
    explanation: "The structural layout, animations, and window management that define how the OS looks and feels on screen.",
    analogy: "The cytoskeleton provides structural scaffolding; the UI framework provides the visual structure and structural rules of the operating system.",
    color: "hsl(340, 80%, 60%)" // Hot Pink
  },
  {
    id: "vesicles",
    name: "Vesicles",
    osFeature: "Inter-app Messaging",
    explanation: "Secure digital packets that carry data—like a shared photo or copied text—from one app to another.",
    analogy: "Vesicles are cargo packets moving between components; intents and inter-process messages carry data across the OS safely.",
    color: "hsl(50, 100%, 60%)" // Gold
  }
];