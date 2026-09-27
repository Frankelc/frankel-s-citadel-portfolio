import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const rate = 22050;
const dir = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "sounds");
mkdirSync(dir, { recursive: true });

function wav(samples) {
  const dataSize = samples.length * 2;
  const buf = Buffer.alloc(44 + dataSize);
  buf.write("RIFF", 0);
  buf.writeUInt32LE(36 + dataSize, 4);
  buf.write("WAVE", 8);
  buf.write("fmt ", 12);
  buf.writeUInt32LE(16, 16);
  buf.writeUInt16LE(1, 20);
  buf.writeUInt16LE(1, 22);
  buf.writeUInt32LE(rate, 24);
  buf.writeUInt32LE(rate * 2, 28);
  buf.writeUInt16LE(2, 32);
  buf.writeUInt16LE(16, 34);
  buf.write("data", 36);
  buf.writeUInt32LE(dataSize, 40);
  for (let i = 0; i < samples.length; i += 1) {
    const s = Math.max(-1, Math.min(1, samples[i] ?? 0));
    buf.writeInt16LE((s * 32767) | 0, 44 + i * 2);
  }
  return buf;
}

function tone(freq, duration, gain = 0.28, type = "square") {
  const n = Math.floor(rate * duration);
  const out = new Array(n);
  for (let i = 0; i < n; i += 1) {
    const t = i / rate;
    const env = Math.min(1, i / 180) * Math.min(1, (n - i) / 400);
    const phase = 2 * Math.PI * freq * t;
    const wave = type === "sine" ? Math.sin(phase) : Math.sign(Math.sin(phase));
    out[i] = wave * gain * env;
  }
  return out;
}

function concat(parts) {
  return parts.flat();
}

function noise(duration, gain = 0.12) {
  const n = Math.floor(rate * duration);
  const out = new Array(n);
  let last = 0;
  for (let i = 0; i < n; i += 1) {
    last = last * 0.86 + (Math.random() * 2 - 1) * 0.14;
    const env = Math.min(1, i / 80) * Math.min(1, (n - i) / 120);
    out[i] = last * gain * env;
  }
  return out;
}

writeFileSync(
  join(dir, "boot-beep.wav"),
  wav(concat([tone(784, 0.09, 0.22), new Array(900).fill(0), tone(1175, 0.14, 0.26)])),
);
writeFileSync(join(dir, "relay.wav"), wav(noise(0.07, 0.55)));
writeFileSync(
  join(dir, "servo.wav"),
  wav(
    Array.from({ length: Math.floor(rate * 0.28) }, (_, i) => {
      const t = i / rate;
      const freq = 220 + t * 420;
      const env = Math.sin((t / 0.28) * Math.PI) * 0.18;
      return Math.sin(2 * Math.PI * freq * t) * env;
    }),
  ),
);
writeFileSync(join(dir, "fan.wav"), wav(noise(1.6, 0.22)));

console.log("sounds written to", dir);
