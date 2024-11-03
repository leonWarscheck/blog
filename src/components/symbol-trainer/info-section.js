import React from "react";

export default function InfoSection({ section }) {
  return (
    <section
      id="info"
      className={`flex grow w-full bg- black max-w-2xl mx-auto px-4`}
    >
      <div className="my-auto w-full max-w-2xl max-h-[54dvh] overflow-scroll prose prose-neutral prose-invert prose-h3:text-neutral-400 prose-h3:font-bold prose-h2:text-neutral-400 text-neutral-400 ">
        <h2 className="hidden">Info</h2>

        <h3>How to Use</h3>
        <p>
          Pick your level in the bottom bar Level tab to open the trainer and
          start typing.
        </p>

        <p>
          Your <span className="font-extrabold">current score</span> (WPM) gets
          shown right to the current levelString. But only if you finish a
          string with 100% accuracy!
        </p>

        <p>
          You can see the current level number and its{" "}
          <span className="font-extrabold">highest score</span> in the bottom
          bar. Your highscores are also shown in the level menu.
        </p>
        <p>
          If you type a wrong character, the trainer{" "}
          <span className="italic">automatically resets</span>. No need to
          restart manually.
        </p>

        <p>
          The levels also change hover-color and "trainer-color" depending on
          your reached milestones: <span className="text-red-500">20</span>{" "}
          <span className="text-violet-500">30</span>{" "}
          <span className="text-yellow-la">40</span>{" "}
          <span className="text-emerald-la">50</span>{" "}
          <span className="text-neutral-400">60</span>
          <br />
          <br />
          Why does it become gray again after 60? Because once you can
          accurately type 15 consecutive characters on 60 wpm, you should
          probably spend your time on more productive things ;)
        </p>

        <p>
          <span className="font-bold">Suggested progression:</span> Find your
          starting range by doing level 53 a few times. Now start at level 1 and
          finish all levels in order up to the next milestone (eg. starting range:
          15-25, next milestone: 30). Then start over from the first level
          striving for the next milestone on each, etc.
        </p>

        <p>
          <span className="font-bold">Saving:</span> Your scores get saved in
          the browser's local storage. To download a backup and import your
          scores, go to the Save menu. Risk of loss depends on your browser
          settings and behavior.
        </p>

        <p>
          When you come back after leaving the page, the trainer will default to
          the last level you picked.
        </p>

        <p>The attributes of each level are described in the Level menu:</p>
        <ul>
          <li>5, 10, 15 is the number of characters per string.</li>
          <li>
            r means it is the reverse order of the previous level, so you learn
            both directions of each movement.
          </li>
          <li>60 levels in total - scroll on the menu to see them all.</li>
        </ul>

        <h3>Why to Use</h3>
        <ol>
          <li>
            You want to learn programming, so you want to be at least
            intermediate at typing symbols and numbers.
          </li>
          <li>
            You prefer learning in clear progressions, checking off concrete
            milestones - just like pianists repeat the same melody over and over
            until it's good, before moving on.
          </li>
          <li>
            TypingClub has a nice progression of levels for letters, but very
            little on symbols and numbers.
          </li>
          <li>
            MonkeyType has custom tests enabling symbol training, but has no
            progression of levels...which leads to lots of manual level
            configuration and no small string score tracking.
          </li>
        </ol>
        <p>This trainer is your best-of-both solution.</p>
      </div>
    </section>
  );
}
