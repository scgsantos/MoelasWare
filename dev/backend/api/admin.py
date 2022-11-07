from django.contrib import admin

# Register your models here.

from moelasware.models import *

admin.site.register(Test)
admin.site.register(Quiz)
admin.site.register(Tag)
admin.site.register(QuizAnswer)
admin.site.register(Submission)
admin.site.register(SubmissionAnswer)
admin.site.register(User)

