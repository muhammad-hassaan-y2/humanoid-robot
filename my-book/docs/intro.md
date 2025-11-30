---
sidebar_position: 1
slug: /
title: Physical AI & Humanoid Robotics
---

![Humanoid Robot](https://svgrepo.com/show/505862/robot.svg)

# Physical AI & Humanoid Robotics  
**Capstone Course • Embodied Intelligence • 2025–2026**

![Embodied Intelligence](https://svgrepo.com/show/530443/ai-brain.svg)

## About This Book & Course

This is the complete playbook for building, training, and deploying state-of-the-art autonomous humanoid robots in 2025–2026 — using only tools and hardware that actually work today.

You will end with a full-stack humanoid (simulated + optional real) that can:
- Hear an open-ended voice command (“Clean up the room”)
- Understand intent with LLMs/VLA models
- Plan a path, navigate obstacles, localize with VSLAM
- Identify and manipulate objects
- Walk bipedally and interact naturally

All built on ROS 2, NVIDIA Isaac Sim, Gazebo, Unity, and modern Vision-Language-Action models.

## Course Structure

### Module 1 – The Robotic Nervous System ! (Weeks 1–5)
- ROS 2 architecture, nodes, topics, services, actions
- rclpy Python bridging for AI agents
- URDF/Xacro for complex humanoid descriptions
- Building & debugging production-grade ROS 2 packages

### Module 2 – The Digital Twin (Weeks 6–7)
- Gazebo physics, sensors, URDF/SDF
- High-fidelity Unity rendering for HRI
- LiDAR, depth cameras, IMU simulation

### Module 3 – The AI-Robot Brain – NVIDIA Isaac™ (Weeks 8–10)
- Isaac Sim – photorealistic simulation + synthetic data at scale
- Isaac ROS – hardware-accelerated VSLAM, perception, Nav2 for bipeds
- Reinforcement & imitation learning pipelines
- Sim-to-real transfer with domain randomization

### Module 4 – Vision-Language-Action (VLA) & Capstone (Weeks 11–13)
- OpenAI Whisper → voice commands
- GPT-4o / OpenVLA / custom models → natural language to ROS 2 action sequences
- Multi-modal interaction (speech + vision + gesture)
- Final Capstone: Fully autonomous humanoid with conversational AI

## Weekly Breakdown

| Weeks   | Focus                                      |
|---------|--------------------------------------------|
| 1–2     | Introduction to Physical AI & humanoid landscape |
| 3–5     | ROS 2 mastery                              |
| 6–7     | Gazebo + Unity simulation                  |
| 8–10    | NVIDIA Isaac Sim + Isaac ROS + RL          |
| 11–12   | Bipedal locomotion, balance, dexterous manipulation |
| 13      | Conversational robotics & capstone delivery |

## Learning Outcomes

By the end you will be able to:
1. Master ROS 2 for real robotic control
2. Build photorealistic digital twins in Isaac Sim/Gazebo
3. Train and deploy modern VLA models on robots
4. Implement state-of-the-art bipedal locomotion & grasping
5. Deploy full stacks on edge hardware (Jetson)
6. Achieve robust sim-to-real transfer

## Assessments

- ROS 2 navigation & manipulation package
- High-fidelity simulation environment
- Isaac ROS perception pipeline (VSLAM + detection)
- Capstone: Autonomous humanoid with voice interface

## Hardware Requirements & Lab Architecture (November 2025 Prices)

### 1. Digital Twin Workstation (Required)
| Component | Minimum                  | Recommended       | Reason                              |
|---------|--------------------------|-------------------|-------------------------------------|
| GPU     | RTX 4070 Ti (12 GB)      | RTX 4090/5090 (24 GB) | Isaac Sim + VLA + physics           |
| CPU     | i7-13700 / Ryzen 9 7900  | i9-14900K / Ryzen 9 7950X3D | Rigid-body dynamics                 |
| RAM     | 32 GB DDR5               | 64–128 GB         | Complex scenes + LLM context        |
| OS      | Ubuntu 22.04 LTS         | Ubuntu 22.04 LTS  | ROS 2 native                        |

### 2. Economy Edge AI Student Kit — ≈ $697 (One-time)
| Component     | Model                               | Price   | Notes                                      |
|---------------|-------------------------------------|---------|--------------------------------------------|
| Brain         | Jetson Orin Nano Super Dev Kit 8 GB | $249    | 40 TOPS, Wi-Fi included                    |
| Eyes + IMU    | Intel RealSense D435i               | $349    | Depth + RGB + IMU (do not buy D435)        |
| Ears          | ReSpeaker USB Mic Array v2.0        | $69     | Far-field voice commands                   |
| Storage/Misc  | 128 GB high-endurance microSD + cables | $30  |                                            |
| **Total**     |                                     | **$697**| Perfect per-student kit                    |

### 3. Physical Robot Options
| Tier          | Robot                | Price (Nov 2025) | Best For                          |
|---------------|----------------------|------------------|-----------------------------------|
| Budget Proxy  | Unitree Go2 Edu      | $2,800–$3,500    | Durable, excellent ROS 2 support  |
| Real Humanoid | Unitree G1 Edu       | $13,900–$16,900  | Best price/performance humanoid   |
| Premium       | Unitree H1           | $89,000+         | Full-size athletic performance    |

### Recommended 2025 Lab Sweet Spot
| Component   | Hardware                     | Function                               |
|-------------|------------------------------|----------------------------------------|
| Sim Rig     | RTX 4080/4090/5090 + Ubuntu  | Isaac Sim, training, synthetic data    |
| Edge Brain  | Jetson Orin Nano Super       | Real-time inference & constraints      |
| Sensors     | RealSense D435i              | Real-world perception                  |
| Actuator    | Unitree G1 (1–2 units) or Go2 fleet | Physical demos & capstone deployment   |

### Cloud-Only Alternative (Zero CapEx)
AWS g5.4xlarge / p5.2xlarge spot instances ≈ $1.80–$2.50/hr  
→ ~$250–$350 per student for the full quarter  
(Still requires local Jetson + RealSense kit for safe physical deployment)

---

*The era of embodied intelligence is here. Let's build it.*

Start with **Module 1: ROS 2** or jump to the hardware chapter that matches your budget.