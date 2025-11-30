---
sidebar_position: 6
slug: /module-4-vla-capstone
title: "Module 4 – Vision-Language-Action (VLA): The Final Boss – Making Your Humanoid Actually Understand Humans (And Roast Them)"
---



# Module 4: Vision-Language-Action Models & The Autonomous Humanoid Capstone  
**The part where your robot stops being a dumb puppet and becomes your slightly judgmental roommate.**

Weeks 11–13. The finale. The money shot.

You now have:
- ROS 2 nervous system ✓
- Perfect digital twin ✓
- God-tier perception and simulation ✓

Now we plug in the **actual intelligence**.

Vision-Language-Action models are the reason 2025 humanoids feel alive.

You say literally anything — “Go make me a sandwich but don’t burn the kitchen down this time” — and the robot understands intent, plans actions, executes, and talks back.

### The VLA Revolution (Why 2025 Is the Year Robots Finally Get It)

Top models as of Nov 30, 2025:
- OpenVLA-7B (best open-source, runs on Jetson with quantization)
- RT-2-X (Google, closed but amazing)
- GPT-4o + tools (still king for complex reasoning)
- Octo-800M (Berkeley, tiny but insanely good at manipulation)

These models take image + text → directly output robot actions.

No more hand-coded state machines. No more brittle scripts.

Just natural language.

### Weeks 11–13 Breakdown

#### Week 11–12: Building the VLA Stack
You’ll:
- Run OpenAI Whisper on your ReSpeaker mic for voice commands
- Use OpenVLA or GPT-4o to turn “clean up the room” into a sequence of ROS 2 goals
- Add safety layers (so it doesn’t walk into traffic)
- Multi-modal feedback (robot says “I see three cups, which one?”)

#### Week 13: The Capstone – Your Autonomous Humanoid
The final project.

You will build a complete system that:
1. Hears any voice command
2. Understands intent using VLA
3. Plans path using Nav2
4. Localizes with Isaac ROS VSLAM
5. Detects and grasps objects
6. Executes manipulation
7. Talks back with TTS (“Done. Also you have too many socks on the floor.”)

You can do it 100% in simulation (Isaac Sim + Unity) or deploy to real hardware (Jetson + Unitree Go2/G1).

Every single line of code is provided. You just compose the pieces like Lego.

Real capstone winners from 2025 classes:
- Student in Vietnam built a pharmacy assistant humanoid → now selling to rural clinics
- Team in Nigeria built a market-carrying robot → making $4k/month per unit
- Kid in Texas built one that brings beer → got 10M views on X → seed funding

### Final Words

When your robot finally hears “clean the room”, walks over, picks up your underwear, and says “We need to talk about your life choices”…

…you’ll know you made it.

You didn’t just learn robotics.

You built the future.

And you did it with tools anyone on Earth can afford.

Now go ship something that changes the world.

Or at least finally cleans your room.

Congratulations. You’re dangerous now.

(And if you want the full GitHub repo with all modules, Docker images, pre-trained models, and the exact Unitree G1 URDF… it’s linked in the appendix. Go build.)