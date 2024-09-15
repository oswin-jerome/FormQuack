import { getDashboardData } from "@/actions/analytics";
import { getUser } from "@/actions/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, BarChart, CheckCircle, Clock, FileText, Globe, Mail, MessageSquare, Send, Shield, XCircle } from "lucide-react";

export default async function Dashboard() {
  // Handle exceptions
  const user = (await getUser()).data;
  const data = (await getDashboardData()).data;

  if (data == undefined) {
    return <div>Unable to load</div>;
  }

  // Placeholder data - replace with actual data from your backend
  const stats = {
    domains: { current: 5, total: 10 },
    forms: { current: data.totalForms, total: data.formLimit },
    submissions: {
      today: data.totalSubmissionsToday,
      thisMonth: data.totalSubmissionsThisMonth,
      total: data.totalSubmissions,
      recent: data.totalSubmissionsToday,
      successRate: 100,
    },
    emailsAdded: data.emailsAdded,
    emailsCollected: 0,
    averageSubmissionsPerForm: data.totalSubmissions / data.totalForms,
    mostActiveForm: data.popularForm?.name,
    spamBlocked: 0,
    emailsForwarded: {
      today: data.totalForwardsToday,
      thisMonth: data.totalForwardsThisMonth,
      total: data.totalForwards,
    },
    emailsFailed: {
      today: data.totalFailsToday,
      thisMonth: data.totalFailsThisMonth,
      total: data.totalFails,
    },
    acknowledgmentsSent: {
      today: 0,
      thisMonth: 0,
      total: 0,
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 ">
      <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
        <div className="bg-gradient-to-r from-purple-400 via-violet-500 to-blue-500 p-8 text-white">
          <h1 className="text-4xl font-bold mb-2">👋 Welcome back, {user.name}!</h1>
          {/* <p className="text-xl opacity-90">Let's check how your forms are performing today.</p> */}
          <p className="text-xl opacity-90">Are you ready to quack quack with FormQuack today? 🦆</p>
        </div>
      </div>

      <header className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalSubmissions}</div>
            <p className="text-xs text-muted-foreground">All-time form submissions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.submissions.successRate}%</div>
            <Progress value={stats.submissions.successRate} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">Submission success rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Submissions per Form</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageSubmissionsPerForm.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Average submissions per form</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Most Active Form</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.mostActiveForm}</div>
            <p className="text-xs text-muted-foreground">Highest number of submissions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Submissions</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {/* TODO: change to 24hrs */}
            <div className="text-2xl font-bold">{stats.submissions.recent}</div>
            <p className="text-xs text-muted-foreground">In the last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Emails Added</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.emailsAdded}</div>
            <p className="text-xs text-muted-foreground">Email accounts added for notification</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Domains</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.totalDomains} / {data.domainLimit}
            </div>
            <Progress value={(data.totalDomains / data.domainLimit) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">{((data.totalDomains / data.domainLimit) * 100).toFixed(0)}% of total domains</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Forms</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.forms.current} / {stats.forms.total}
            </div>
            <Progress value={(stats.forms.current / stats.forms.total) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">{((stats.forms.current / stats.forms.total) * 100).toFixed(0)}% of total forms</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Submissions Overview</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.submissions.today}</div>
            <p className="text-xs text-muted-foreground">Today</p>
            <div className="text-lg font-semibold mt-2">{stats.submissions.thisMonth}</div>
            <p className="text-xs text-muted-foreground">This Month</p>
            <div className="text-lg font-semibold mt-2">{stats.submissions.total}</div>
            <p className="text-xs text-muted-foreground">All Time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Emails Collected</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.emailsCollected.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Total unique emails collected</p>
            <div className="mt-4">
              <Progress value={(stats.emailsAdded / stats.submissions.total) * 100} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">{((stats.emailsAdded / stats.submissions.total) * 100).toFixed(1)}% of total submissions</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Emails Forwarded</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.emailsForwarded.today}</div>
            <p className="text-xs text-muted-foreground">Today</p>
            <div className="text-lg font-semibold mt-2">{stats.emailsForwarded.thisMonth}</div>
            <p className="text-xs text-muted-foreground">This Month</p>
            <div className="text-lg font-semibold mt-2">{stats.emailsForwarded.total}</div>
            <p className="text-xs text-muted-foreground">All Time</p>
            <div className="mt-4">
              <Progress value={(stats.emailsForwarded.total / stats.submissions.total) * 100} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">{((stats.emailsForwarded.total / stats.submissions.total) * 100).toFixed(1)}% of total submissions</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Email Forwards</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.emailsFailed.today}</div>
            <p className="text-xs text-muted-foreground">Today</p>
            <div className="text-lg font-semibold mt-2">{stats.emailsFailed.thisMonth}</div>
            <p className="text-xs text-muted-foreground">This Month</p>
            <div className="text-lg font-semibold mt-2">{stats.emailsFailed.total}</div>
            <p className="text-xs text-muted-foreground">All Time</p>
            <div className="mt-4">
              <Progress value={(stats.emailsFailed.total / stats.emailsForwarded.total) * 100} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">{((stats.emailsFailed.total / stats.emailsForwarded.total) * 100).toFixed(1)}% of total forwarded emails</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Acknowledgments Sent</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.acknowledgmentsSent.today}</div>
            <p className="text-xs text-muted-foreground">Today</p>
            <div className="text-lg font-semibold mt-2">{stats.acknowledgmentsSent.thisMonth}</div>
            <p className="text-xs text-muted-foreground">This Month</p>
            <div className="text-lg font-semibold mt-2">{stats.acknowledgmentsSent.total}</div>
            <p className="text-xs text-muted-foreground">All Time</p>
            <div className="mt-4">
              <Progress value={(stats.acknowledgmentsSent.total / stats.submissions.total) * 100} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">{((stats.acknowledgmentsSent.total / stats.submissions.total) * 100).toFixed(1)}% of total submissions</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
