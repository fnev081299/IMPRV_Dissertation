import numpy as np
import pandas as pd
from pandas import Series, DataFrame
import matplotlib.pyplot as plt
import numpy as np

# # all participants
# participants = ['S1A-P1', 'S1A-P2', 'S2A-P1', 'S2A-P2 ', 'S1B-P1', 'S1B-P2', 'S2B-P1', 'S2B-P2']
# study = ['Pre-Study', 'In-Study']
# pos = np.arange(len(participants))
# bar_width = 0.35
# pre_lesson = [24, 71, 57, 42, 71, 78, 85, 64]
# in_lesson = [47, 71, 57, 50, 92, 85, 92, 100]
#
# plt.bar(pos, pre_lesson, bar_width, color='grey', edgecolor='black')
# plt.bar(pos + bar_width, in_lesson, bar_width, color='black', edgecolor='black')
# plt.xticks(pos, participants)
# plt.xlabel('Participants (Code and Participant number)', fontsize=16)
# plt.ylabel('Quiz Scores (%)', fontsize=16)
# plt.title('Student Quiz Grades (All Participants)', fontsize=18)
# plt.legend(study, loc=2)
# plt.show()
#
# # in app
# participants = ['S1B-P1', 'S1B-P2', 'S2B-P1', 'S2B-P2']
# study = ['Pre-Study', 'In-Study']
# pos = np.arange(len(participants))
# bar_width = 0.35
# pre_lesson = [71, 78, 85, 64]
# in_lesson = [92, 85, 92, 100]
#
# plt.bar(pos, pre_lesson, bar_width, color='grey', edgecolor='black')
# plt.bar(pos + bar_width, in_lesson, bar_width, color='black', edgecolor='black')
# plt.xticks(pos, participants)
# plt.xlabel('Participants (Code and Participant number)', fontsize=16)
# plt.ylabel('Quiz Scores (%)', fontsize=16)
# plt.title('Student Quiz Grades (App)', fontsize=18)
# plt.legend(study, loc=2)
# plt.show()
#
# # lesson + app
# participants = ['S1A-P1', 'S1A-P2', 'S2A-P1', 'S2A-P2 ']
# study = ['Pre-Study', 'In-Study']
# pos = np.arange(len(participants))
# bar_width = 0.35
# pre_lesson = [24, 71, 57, 42]
# in_lesson = [47, 71, 57, 50]
#
# plt.bar(pos, pre_lesson, bar_width, color='grey', edgecolor='black')
# plt.bar(pos + bar_width, in_lesson, bar_width, color='black', edgecolor='black')
# plt.xticks(pos, participants)
# plt.xlabel('Participants (Code and Participant number)', fontsize=16)
# plt.ylabel('Quiz Scores (%)', fontsize=16)
# plt.title('Student Quiz Grades (App + Lesson)', fontsize=18)
# plt.legend(study, loc=2)
# plt.show()
#
# # h1
# participants = ['S1A-P1', 'S1A-P2', 'S1B-P1', 'S1B-P2']
# study = ['Pre-Study', 'In-Study']
# pos = np.arange(len(participants))
# bar_width = 0.35
# pre_lesson = [24, 71, 71, 78]
# in_lesson = [47, 71, 92, 85]
#
# plt.bar(pos, pre_lesson, bar_width, color='grey', edgecolor='black')
# plt.bar(pos + bar_width, in_lesson, bar_width, color='black', edgecolor='black')
# plt.xticks(pos, participants)
# plt.xlabel('Participants (Code and Participant number)', fontsize=16)
# plt.ylabel('Quiz Scores (%)', fontsize=16)
# plt.title('Student Quiz Grades (S1A vs S1B)', fontsize=18)
# plt.legend(study, loc=2)
# plt.show()
#
# # h2
# participants = ['S2B-P1', 'S2B-P2', 'S1B-P1', 'S1B-P2']
# study = ['Pre-Study', 'In-Study']
# pos = np.arange(len(participants))
# bar_width = 0.35
# pre_lesson = [85, 64, 71, 78]
# in_lesson = [92, 100, 92, 85]
#
# plt.bar(pos, pre_lesson, bar_width, color='grey', edgecolor='black')
# plt.bar(pos + bar_width, in_lesson, bar_width, color='black', edgecolor='black')
# plt.xticks(pos, participants)
# plt.xlabel('Participants (Code and Participant number)', fontsize=16)
# plt.ylabel('Quiz Scores (%)', fontsize=16)
# plt.title('Student Quiz Grades (S2B vs S1B)', fontsize=18)
# plt.legend(study, loc=2)
# plt.show()
#
# # h3
# participants = ['S1A-P1', 'S1A-P2', 'S2B-P1', 'S2B-P2']
# study = ['Pre-Study', 'In-Study']
# pos = np.arange(len(participants))
# bar_width = 0.35
# pre_lesson = [24, 71, 85, 64]
# in_lesson = [47, 71, 92, 100]
#
# plt.bar(pos, pre_lesson, bar_width, color='grey', edgecolor='black')
# plt.bar(pos + bar_width, in_lesson, bar_width, color='black', edgecolor='black')
# plt.xticks(pos, participants)
# plt.xlabel('Participants (Code and Participant number)', fontsize=16)
# plt.ylabel('Quiz Scores (%)', fontsize=16)
# plt.title('Student Quiz Grades (S1A vs S2B)', fontsize=18)
# plt.legend(study, loc=2)
# plt.show()
#
# # h4
# participants = ['S2A-P1', 'S2A-P2 ', 'S2B-P1', 'S2B-P2']
# study = ['Pre-Study', 'In-Study']
# pos = np.arange(len(participants))
# bar_width = 0.35
# pre_lesson = [57, 42, 85, 64]
# in_lesson = [57, 50, 92, 100]
#
# plt.bar(pos, pre_lesson, bar_width, color='grey', edgecolor='black')
# plt.bar(pos + bar_width, in_lesson, bar_width, color='black', edgecolor='black')
# plt.xticks(pos, participants)
# plt.xlabel('Participants (Code and Participant number)', fontsize=16)
# plt.ylabel('Quiz Scores (%)', fontsize=16)
# plt.title('Student Quiz Grades (S2A vs S2B)', fontsize=18)
# plt.legend(study, loc=2)
# plt.show()
#
# # standard deviations of the differences in grade
# std_app = [21, 7, 7, 36]
# x = np.std(std_app)
#
# print("App")
# print(x)
#
# std_lesson_app = [0, 0, 18, 8]
# x = np.std(std_lesson_app)
#
# print("Lesson and App")
# print(x)
#
# std_all = [0, 0, 18, 8, 21, 7, 7, 36]
# x = np.std(std_all)
#
# print("All")
# print(x)



