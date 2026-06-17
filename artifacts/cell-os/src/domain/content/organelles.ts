import type { Organelle } from "@/domain/types";

/**
 * The fifteen biological-to-OS mappings. This is the source of truth for the
 * interactive cell diagram and the OS Genome reference list.
 */
export const CELL_MAPPINGS: Organelle[] = [
  {
    id: "nucleus",
    name: "Nucleus",
    osFeature: "Kernel / Control Center",
    explanation: "The central governor that manages the phone's fundamental operations, holding the most critical instructions and orchestrating all lower-level hardware interactions. Biophoton profile (Verified via DNA): UV photon emission (200–380 nm) originates within the nucleus from DNA tautomeric transitions — quantum tunnelling events at the base-pair level generate coherent UV light at 1–10 photons/cm²/s. The nucleus is therefore both an information store and an active UV emitter, broadcasting its quantum processing state outward.",
    analogy: "Just as the nucleus holds DNA and governs the whole cell, the kernel directs the entire operating system securely from its core.",
    color: "hsl(280, 80%, 60%)" // Purple
  },
  {
    id: "dna",
    name: "DNA / Genome",
    osFeature: "System Code + User Configuration",
    explanation: "The immutable root code combined with your personalized settings that dictate exactly how your device behaves and responds. Biophoton profile (Verified, Pietruszka & Marzec 2024): DNA emits ultra-weak UV photons (200–380 nm) at 1–10 photons/cm²/s during tautomeric base-pair transitions — quantum tunnelling events (keto↔enol, amino↔imino) that are accompanied by measurable UV coherent light. The genome announces its own quantum processing through light.",
    analogy: "DNA holds the blueprint of life; the system code and your configurations are the immutable core and editable settings that make your phone uniquely yours.",
    color: "hsl(180, 100%, 50%)" // Cyan
  },
  {
    id: "nucleolus",
    name: "Nucleolus",
    osFeature: "ART Preloading / dex2oat AOT Factory",
    explanation: "The nucleolus pre-assembles ribosomal subunits for export through nuclear pores. On Android, dex2oat pre-compiles DEX bytecode into native ARM64 machine code before any app executes. The factory runs before the product is needed — manufactured ahead of demand.",
    analogy: "The nucleolus is not the first thing to wake — it is the pre-assembly factory that runs before it is needed. dex2oat compiles apps into native binaries at install time, before any user ever taps them.",
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
    osFeature: "HAL Boundary / Security Layer",
    explanation: "The double boundary of the Android OS: the HAL partition enforced by HIDL and AIDL (the /system↔/vendor wall that Project Treble made mandatory from Android 8 onward), and the app permissions layer controlling what data leaves or enters each sandboxed process. The Fairphone 5 launched on Android 13 — AIDL-native — making this boundary the most formally enforced in the device's history. Two junction types coexist: tight junctions (SELinux Type Enforcement rules — paracellular seal, no direct cross-domain passage permitted, enforced by LSM hooks in the kernel) and gap junctions (Binder ashmem/memfd channels — direct shared-memory pass-through between processes without exocytosis, the connexin-43 of Android IPC).",
    analogy: "The membrane is the cell's only legal channel for crossing the boundary in either direction; Android's HAL partition is the same principle enforced in silicon — before Project Treble, /system and /vendor leaked into each other freely, and OTA updates broke hardware drivers. Treble fixed it by making the membrane real. Tight junctions (SELinux) seal the paracellular space; gap junctions (Binder mmap) provide direct cytoplasmic continuity between trusted compartments.",
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
    explanation: "The adaptive energy system that efficiently distributes power to where it is needed most to prolong your device's lifespan. Biophoton profile (Verified): primary ultra-weak photon emitter of the cell, emitting in the red band (570–670 nm) at 10–1000 photons/cm²/s via ROS-driven lipid peroxidation at Complex I and III. This emission is a quantum-scale readout of oxidative state — the mitochondrion externalizes its energy budget as light before any downstream chemical cascade begins.",
    analogy: "The powerhouse of the cell; the battery and its intelligent management system act as the ultimate energy plant.",
    color: "hsl(35, 100%, 55%)" // Orange/Amber
  },
  {
    id: "ribosomes",
    name: "Ribosomes",
    osFeature: "ART / JIT Compiler",
    explanation: "Android Runtime (ART) is the cell's translation machinery: it verifies DEX bytecode type descriptors before any code executes (just as the ribosome checks codon-anticodon match before forming a peptide bond), then JIT-compiles hot paths with a baseline compiler followed by an optimizing compiler. Nothing runs in ART that hasn't passed verification — the genome's integrity is enforced before expression.",
    analogy: "Ribosomes decode mRNA codons into amino acids, one codon at a time, with verification before commitment; ART decodes DEX bytecode into native instructions, verifying types before executing — both are dedicated machinery for one repeated decoding operation.",
    color: "hsl(300, 70%, 65%)" // Magenta
  },
  {
    id: "endoplasmic-reticulum",
    name: "Endoplasmic Reticulum",
    osFeature: "App Framework / System Services",
    explanation: "The massive foundational network of background services and APIs that support running apps and transporting data between them. Biophoton profile (Verified): the ER emits in the visible-to-red band (400–700 nm) at 5–100 photons/cm²/s driven by PDI-ERO1 oxidative folding — protein disulfide isomerase generates ROS as a byproduct of disulfide bond formation, producing measurable ultra-weak photon emission. The ER-mitochondria contact sites (MAMs) propagate this signal directly to the mitochondrial outer membrane.",
    analogy: "The ER is the cell's transport and assembly network; the OS framework scaffolds and routes resources for applications.",
    color: "hsl(220, 80%, 65%)" // Blue
  },
  {
    id: "golgi-apparatus",
    name: "Golgi Apparatus",
    osFeature: "App Compilation + Update Dispatch",
    explanation: "The sequential refinement and dispatch center: dex2oat compiles DEX bytecode into native machine code during installation, writing the hardware destination into the app's binary (just as the Golgi writes glycan address codes into proteins). The same apparatus routes OTA update packages — addressed, staged, and delivered to the correct partition without touching the other.",
    analogy: "The Golgi sorts proteins through stacked cisternae, writing a molecular zip code into each cargo before shipping; dex2oat compiles and optimizes Android apps into native binaries, and the update system packages OTA patches for precisely routed partition delivery.",
    color: "hsl(25, 90%, 60%)" // Peach
  },
  {
    id: "lysosomes",
    name: "Lysosomes",
    osFeature: "Cache Cleanup / Uninstaller / TEE Containment",
    explanation: "The digital recycling center that clears out residual junk data, temporary caches, and uninstalls old apps. At the apparatus scale this organelle also carries the peroxisomal containment function (frozen-15 constraint): just as peroxisomes neutralise H₂O₂ inside a hard membrane boundary, the Keystore/TEE neutralises cryptographic operations inside ARM TrustZone's Secure World — the blast radius of dangerous chemistry never reaches the cytoplasm.",
    analogy: "Lysosomes break down cellular waste; peroxisomes contain reactive chemistry within a sealed enclave. Both functions are expressed here: system cleanup maps to the lysosomal degradation axis, and cryptographic key isolation maps to the peroxisomal containment axis.",
    color: "hsl(80, 90%, 50%)" // Yellow-green
  },
  {
    id: "vacuole",
    name: "Vacuole",
    osFeature: "Storage / File System / Key Vault",
    explanation: "The secure vault where all your photos, documents, and downloaded applications are stored persistently. The vacuole's sequestered-reserve function also maps to the TEE key vault: hardware-backed key material is isolated in the Secure World, inaccessible to the Normal World OS — a reserve that can be drawn upon only through a controlled interface, never exported directly.",
    analogy: "A vacuole stores nutrients in a membrane-sealed compartment, inaccessible to cytoplasmic enzymes except through controlled release. The file system stores your data; the Keystore/StrongBox stores your keys in a hardware enclave with the same controlled-access property.",
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
