import numpy as np
import pandas as pd
from pandas import Series, DataFrame
import matplotlib.pyplot as plt
import numpy as np

# lesson and app participants
objects = (1, 2, 3, 4)
y_pos = np.arange(len(objects))
width = 0.3
pre_lesson = [71, 24, 57, 42]
in_lesson = [71, 47, 57, 50]

plt.bar(np.arange(len(pre_lesson)), pre_lesson, width=width, color='grey')
plt.bar(np.arange(len(in_lesson)) + width, in_lesson, width=width, color='black')

plt.xticks(y_pos, objects)
plt.xlabel('Participants 1 - 4 ')
plt.ylabel('Quiz Scores (%)')
plt.title('Student Quiz Grades (In Lesson and App)')

plt.show()

# app only participants
objects = (1, 2, 3, 4)
y_pos = np.arange(len(objects))
width = 0.3
pre_lesson = [71, 78, 85, 64]
in_lesson = [92, 85, 92, 100]

plt.bar(np.arange(len(pre_lesson)), pre_lesson, width=width, color='grey')
plt.bar(np.arange(len(in_lesson)) + width, in_lesson, width=width, color='black')

plt.xticks(y_pos, objects)
plt.xlabel('Participants 1 - 4 ')
plt.ylabel('Quiz Scores (%)')
plt.title('Student Quiz Grades (App Only)')

plt.show()

# focus group 1 (a)
objects = (1, 2)
y_pos = np.arange(len(objects))
width = 0.3
pre_lesson = [57, 42]
in_lesson = [57, 50]

plt.bar(np.arange(len(pre_lesson)), pre_lesson, width=width, color='grey')
plt.bar(np.arange(len(in_lesson)) + width, in_lesson, width=width, color='black')

plt.xticks(y_pos, objects)
plt.title('Focus Group 1 (A) Results')
plt.xlabel('Participants 1 and 2')
plt.ylabel('Quiz Scores (%)')

plt.show()

std_all = [57, 57]
x = np.std(std_all)

print("1")
print(x)

std_all = [42, 50]
x = np.std(std_all)

print("2")
print(x)

# focus group 1 (b)
objects = (1, 2)
y_pos = np.arange(len(objects))
width = 0.3
pre_lesson = [71, 78]
in_lesson = [92, 85]

plt.bar(np.arange(len(pre_lesson)), pre_lesson, width=width, color='grey')
plt.bar(np.arange(len(in_lesson)) + width, in_lesson, width=width, color='black')

plt.xticks(y_pos, objects)
plt.title('Focus Group 1 (B) Results')
plt.xlabel('Participants 1 and 2')
plt.ylabel('Quiz Scores (%)')

std_all = [71, 92]
x = np.std(std_all)

print("1")
print(x)

std_all = [78, 85]
x = np.std(std_all)

print("2")
print(x)

plt.show()

# focus group 2 (a)
objects = (1, 2)
y_pos = np.arange(len(objects))
width = 0.3
pre_lesson = [71, 24]
in_lesson = [71, 42]

plt.bar(np.arange(len(pre_lesson)), pre_lesson, width=width, color='grey')
plt.bar(np.arange(len(in_lesson)) + width, in_lesson, width=width, color='black')

plt.xticks(y_pos, objects)
plt.title('Focus Group 2 (A) Results')
plt.xlabel('Participants 1 and 2')
plt.ylabel('Quiz Scores (%)')

plt.show()

std_all = [71, 71]
x = np.std(std_all)

print("1")
print(x)

std_all = [24, 42]
x = np.std(std_all)

print("2")
print(x)

# focus group 2 (b)
objects = (1, 2)
y_pos = np.arange(len(objects))
width = 0.3
pre_lesson = [85, 64]
in_lesson = [92, 100]

plt.bar(np.arange(len(pre_lesson)), pre_lesson, width=width, color='grey')
plt.bar(np.arange(len(in_lesson)) + width, in_lesson, width=width, color='black')

plt.xticks(y_pos, objects)
plt.title('Focus Group 2 (B) Results')
plt.xlabel('Participants 1 and 2')
plt.ylabel('Quiz Scores (%)')

plt.show()

std_all = [85, 92]
x = np.std(std_all)

print("1")
print(x)

std_all = [64, 100]
x = np.std(std_all)

print("2")
print(x)

# ---------------------------

import numpy as np
import pandas as pd
from pandas import Series, DataFrame
import matplotlib.pyplot as plt
import numpy as np

# all participants
participants = ['S1A-P1', 'S1A-P2', 'S2A-P1', 'S2A-P2 ', 'S1B-P1', 'S1B-P2', 'S2B-P1', 'S2B-P2']
study = ['Pre-Study', 'In-Study']
pos = np.arange(len(participants))
bar_width = 0.35
pre_lesson = [24, 71, 57, 42, 71, 78, 85, 64]
in_lesson = [47, 71, 57, 50, 92, 85, 92, 100]

plt.bar(pos, pre_lesson, bar_width, color='grey', edgecolor='black')
plt.bar(pos + bar_width, in_lesson, bar_width, color='black', edgecolor='black')
plt.xticks(pos, participants)
plt.xlabel('Participants (Code and Participant number)', fontsize=16)
plt.ylabel('Quiz Scores (%)', fontsize=16)
plt.title('Student Quiz Grades (All Participants)', fontsize=18)
plt.legend(study, loc=2)
plt.show()

# in app
participants = ['S1B-P1', 'S1B-P2', 'S2B-P1', 'S2B-P2']
study = ['Pre-Study', 'In-Study']
pos = np.arange(len(participants))
bar_width = 0.35
pre_lesson = [71, 78, 85, 64]
in_lesson = [92, 85, 92, 100]

plt.bar(pos, pre_lesson, bar_width, color='grey', edgecolor='black')
plt.bar(pos + bar_width, in_lesson, bar_width, color='black', edgecolor='black')
plt.xticks(pos, participants)
plt.xlabel('Participants (Code and Participant number)', fontsize=16)
plt.ylabel('Quiz Scores (%)', fontsize=16)
plt.title('Student Quiz Grades (App)', fontsize=18)
plt.legend(study, loc=2)
plt.show()

# lesson + app
participants = ['S1A-P1', 'S1A-P2', 'S2A-P1', 'S2A-P2 ']
study = ['Pre-Study', 'In-Study']
pos = np.arange(len(participants))
bar_width = 0.35
pre_lesson = [24, 71, 57, 42]
in_lesson = [47, 71, 57, 50]

plt.bar(pos, pre_lesson, bar_width, color='grey', edgecolor='black')
plt.bar(pos + bar_width, in_lesson, bar_width, color='black', edgecolor='black')
plt.xticks(pos, participants)
plt.xlabel('Participants (Code and Participant number)', fontsize=16)
plt.ylabel('Quiz Scores (%)', fontsize=16)
plt.title('Student Quiz Grades (App and lesson)', fontsize=18)
plt.legend(study, loc=2)
plt.show()

# h1
participants = ['S1A-P1', 'S1A-P2', 'S1B-P1', 'S1B-P2']
study = ['Pre-Study', 'In-Study']
pos = np.arange(len(participants))
bar_width = 0.35
pre_lesson = [24, 71, 71, 78]
in_lesson = [47, 71, 92, 85]

plt.bar(pos, pre_lesson, bar_width, color='grey', edgecolor='black')
plt.bar(pos + bar_width, in_lesson, bar_width, color='black', edgecolor='black')
plt.xticks(pos, participants)
plt.xlabel('Participants (Code and Participant number)', fontsize=16)
plt.ylabel('Quiz Scores (%)', fontsize=16)
plt.title('Student Quiz Grades (S1A vs S1B)', fontsize=18)
plt.legend(study, loc=2)
plt.show()

# h2
participants = ['S2B-P1', 'S2B-P2', 'S1B-P1', 'S1B-P2']
study = ['Pre-Study', 'In-Study']
pos = np.arange(len(participants))
bar_width = 0.35
pre_lesson = [85, 64, 71, 78]
in_lesson = [92, 100, 92, 85]

plt.bar(pos, pre_lesson, bar_width, color='grey', edgecolor='black')
plt.bar(pos + bar_width, in_lesson, bar_width, color='black', edgecolor='black')
plt.xticks(pos, participants)
plt.xlabel('Participants (Code and Participant number)', fontsize=16)
plt.ylabel('Quiz Scores (%)', fontsize=16)
plt.title('Student Quiz Grades (S2B vs S1B)', fontsize=18)
plt.legend(study, loc=2)
plt.show()

# h3
participants = ['S1A-P1', 'S1A-P2', 'S2B-P1', 'S2B-P2']
study = ['Pre-Study', 'In-Study']
pos = np.arange(len(participants))
bar_width = 0.35
pre_lesson = [24, 71, 85, 64]
in_lesson = [47, 71, 92, 100]

plt.bar(pos, pre_lesson, bar_width, color='grey', edgecolor='black')
plt.bar(pos + bar_width, in_lesson, bar_width, color='black', edgecolor='black')
plt.xticks(pos, participants)
plt.xlabel('Participants (Code and Participant number)', fontsize=16)
plt.ylabel('Quiz Scores (%)', fontsize=16)
plt.title('Student Quiz Grades (S1A vs S2B)', fontsize=18)
plt.legend(study, loc=2)
plt.show()

# h4
participants = ['S2A-P1', 'S2A-P2 ', 'S2B-P1', 'S2B-P2']
study = ['Pre-Study', 'In-Study']
pos = np.arange(len(participants))
bar_width = 0.35
pre_lesson = [57, 42, 85, 64]
in_lesson = [57, 50, 92, 100]

plt.bar(pos, pre_lesson, bar_width, color='grey', edgecolor='black')
plt.bar(pos + bar_width, in_lesson, bar_width, color='black', edgecolor='black')
plt.xticks(pos, participants)
plt.xlabel('Participants (Code and Participant number)', fontsize=16)
plt.ylabel('Quiz Scores (%)', fontsize=16)
plt.title('Student Quiz Grades (S2A vs S2B)', fontsize=18)
plt.legend(study, loc=2)
plt.show()

# standard deviations of the differences in grade
std_app = [21, 7, 7, 36]
x = np.std(std_app)

print("App")
print(x)

std_lesson_app = [0, 0, 18, 8]
x = np.std(std_lesson_app)

print("Lesson and App")
print(x)

std_all = [0, 0, 18, 8, 21, 7, 7, 36]
x = np.std(std_all)

print("All")
print(x)


# all students
objects = (1, 2, 3, 4, 5, 6, 7, 8)
y_pos = np.arange(len(objects))
width = 0.3
pre_lesson = [71, 24, 57, 42, 71, 78, 85, 64]
in_lesson = [71, 47, 57, 50, 92, 85, 92, 100]

plt.bar(np.arange(len(pre_lesson)), pre_lesson, width=width, color='grey')
plt.bar(np.arange(len(in_lesson)) + width, in_lesson, width=width, color='black')

plt.xticks(y_pos, objects)
plt.xlabel('Participants 1 - 8 ')
plt.ylabel('Quiz Scores (%)')
plt.title('Student Quiz Grades (All Participants)')

plt.show()

# standard deviations of the differences in grade
std_app = [21, 7, 7, 36]
x = np.std(std_app)

print("App")
print(x)

std_lesson_app = [0, 0, 18, 8]
x = np.std(std_lesson_app)

print("Lesson and App")
print(x)

std_all = [0, 0, 18, 8, 21, 7, 7, 36]
x = np.std(std_all)

print("All")
print(x)
