import test from "node:test";
import assert from "node:assert/strict";
import { profileData } from "./profile.ts";
import { heroScenes } from "./heroScenes.ts";
import { projectsData } from "./projects.ts";
import { skillsData, focusAreasData, educationData } from "./skills.ts";

test("Profile Data conforms to student honesty standards", () => {
  assert.equal(profileData.name, "S.V. Praveen Kumar");
  assert.equal(profileData.institution, "AMS College of Engineering");
  assert.equal(profileData.graduationYear, 2028);
  assert.equal(profileData.specialization, "Artificial Intelligence and Machine Learning");
  // Ensure new professional email is configured correctly
  assert.equal(profileData.contact.email, "praveenkumar251656@gmail.com");
  assert.equal(profileData.contact.emailDisplay, "praveenkumar251656@gmail.com");
  assert.ok(profileData.contact.linkedIn.isConfigured);
  assert.equal(profileData.contact.linkedIn.url, "https://www.linkedin.com/in/praveen-kumar-s-v-188364432");
  assert.ok(profileData.contact.github.isConfigured);
  assert.equal(profileData.contact.github.url, "https://github.com/praveenkumar251656-coder");
  assert.equal(profileData.contact.resume.url, "/api/resume/download");
  assert.equal(profileData.photos.portrait, "/assets/aistudio/abc_3c096142.jpeg");
  assert.equal(profileData.photos.banner, "/assets/aistudio/pk_5b0b668f.jpeg");
  assert.equal(profileData.principles.length, 3);
});

test("Hero Scenes configure exactly 4 Google Flow stages", () => {
  assert.equal(heroScenes.length, 4);
  const stages = heroScenes.map(s => s.narrative);
  assert.deepEqual(stages, ["Curiosity", "Exploration", "Intelligence", "Creation"]);
  for (const scene of heroScenes) {
    assert.ok(scene.videoSrc.startsWith("/"), `videoSrc must start with slash: ${scene.videoSrc}`);
    assert.ok(scene.title.length > 0);
    assert.ok(scene.description.length > 0);
  }
});

test("Projects Data accurately marks prototype and concept statuses", () => {
  assert.equal(projectsData.length, 4);
  const allowedStatuses = ["Prototype / In Progress", "Concept / Prototype"];
  for (const project of projectsData) {
    assert.ok(allowedStatuses.includes(project.status), `Invalid status: ${project.status}`);
    assert.ok(project.conceptualFeatures.length >= 3);
    assert.ok(project.challengesAndLessons.length >= 2);
    assert.ok(project.nextSteps.length >= 2);
  }
});

test("Skills Data avoids fake percentages and groups by honest learning stages", () => {
  assert.ok(skillsData.length >= 3);
  const validStages = ["Core Foundation", "Actively Learning", "Explored in Projects"];
  for (const category of skillsData) {
    assert.ok(category.items.length > 0);
    for (const item of category.items) {
      assert.ok(validStages.includes(item.stage), `Invalid stage for ${item.name}: ${item.stage}`);
    }
  }
});

test("Education Data confirms AMS College of Engineering and expected 2028 graduation", () => {
  assert.equal(educationData.institution, "AMS College of Engineering");
  assert.ok(educationData.period.includes("2028"));
  assert.ok(educationData.courseworkAreas.length >= 6);
  assert.equal(focusAreasData.length, 5);
});
